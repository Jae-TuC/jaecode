import { useRef, useState, useMemo, type RefObject } from "react"
import type { ScrollBoxRenderable } from "@opentui/core"
import { useKeyboard } from "@opentui/react"
import { getFilteredCommands } from "./filter-command"
import type { Command } from "./types"

type UseCommandMenuReturn = {
    showCommandMenu: boolean;
    commandQuery: string;
    selectedIndex: number;
    scrollRef: RefObject<ScrollBoxRenderable | null>;
    handleContentChange: (text: string) => void;
    resolveCommand: (index: number) => Command | undefined;
    setSelectedIndex: (index: number) => void;
}


/**
 * Manage state and handlers for a slash-command menu used in a text input.
 *
 * Exposes derived query/filtering state, selection and scroll control, and handlers to update content,
 * resolve a selection, and programmatically set the selected index.
 *
 * @returns An object containing:
 * - `showCommandMenu` — whether the command menu is currently visible
 * - `commandQuery` — the current query string (text after a leading `/`) when the menu is shown, otherwise `""`
 * - `selectedIndex` — index of the currently highlighted command in `filteredCommands`
 * - `scrollRef` — ref to the scrollable container used to keep the highlighted item in view
 * - `resolveCommand` — function `(index: number) => Command | undefined` that returns the command at the given filtered index and hides the menu when a command is found
 * - `handleContentChange` — function `(text: string) => void` to update input text, reset selection, scroll to top, and toggle menu visibility based on the typed prefix
 * - `setSelectedIndex` — setter to update the highlighted command index
 */
export function useCommandMenu(): UseCommandMenuReturn {
    const [textValue, setTextValue] = useState("")
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showCommandMenu, setShowCommandMenu] = useState(false);
    const scrollRef = useRef<ScrollBoxRenderable | null>(null);

    const commandQuery = showCommandMenu && textValue.startsWith("/") ? textValue.slice(1) : "";
    const filteredCommands = useMemo(() => getFilteredCommands(commandQuery), [commandQuery]);

    const handleContentChange = (text: string) => {
        setTextValue(text);
        setSelectedIndex(0);

        const scrollbox = scrollRef.current;
        if (scrollbox) {
            scrollbox.scrollTo(0);
        }
        const isCommandInput = text.startsWith('/');
        const prefix = isCommandInput ? text.slice(1) : ""
        setShowCommandMenu(isCommandInput && !prefix.includes(" "))
    }

    useKeyboard((key) => {
        if (!showCommandMenu) return;

        if (key.name === "escape") {
            key.preventDefault()
            setShowCommandMenu(false);
        } else if (key.name === "up") {
            key.preventDefault();
            setSelectedIndex((i: number) => {
                const newIndex = Math.max(0, i - 1)

                const sb = scrollRef.current;

                if (sb && newIndex < sb.scrollTop) {
                    sb.scrollTo(newIndex);
                }

                return newIndex;
            })
        } else if (key.name === "down") {
            key.preventDefault();
            setSelectedIndex((i: number) => {
                if (filteredCommands.length === 0) return 0;

                const newIndex = Math.min(filteredCommands.length - 1, i + 1)
                const sb = scrollRef.current;

                if (sb) {
                    const viewportHeight = sb.viewport.height;
                    const visibleEnd = sb.scrollTop + viewportHeight - 1;
                    if (newIndex > visibleEnd) {
                        sb.scrollTo(newIndex - viewportHeight + 1);
                    }
                }
                return newIndex;
            })
        }
    })

    const resolveCommand = (index: number): Command | undefined => {
        const command = filteredCommands[index];
        if (command) {
            setShowCommandMenu(false);
        }
        return command;
    }
    return {
        showCommandMenu,
        commandQuery,
        selectedIndex,
        scrollRef,
        resolveCommand,
        handleContentChange,
        setSelectedIndex
    }
}