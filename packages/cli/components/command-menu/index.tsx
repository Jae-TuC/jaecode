import type { RefObject } from "react"
import { TextAttributes, type ScrollBoxRenderable } from "@opentui/core"
import { getFilteredCommands } from "./filter-command"
import { COMMANDS } from "./command"

const MAX_VISIBLE_ITEMS = 8;
const COMMAND_COL_WIDTH = Math.max(...COMMANDS.map(cmd => cmd.name.length)) + 4;

type CommandMenuProps = {
    query: string;
    selectedIndex: number;
    scrollRef: RefObject<ScrollBoxRenderable | null>;
    onSelect: (index: number) => void;
    onExecute: (index: number) => void;
}

/**
 * Render a scrollable list of commands filtered by `query` and handle mouse-driven selection and execution.
 *
 * @param query - Filter string used to compute the displayed commands.
 * @param selectedIndex - Index within the filtered list that should be highlighted.
 * @param scrollRef - Ref attached to the scrollbox element to control or query scroll state.
 * @param onSelect - Callback invoked with an item index when the mouse moves over that item.
 * @param onExecute - Callback invoked with an item index when the mouse is pressed on that item.
 * @returns A React element containing either a dimmed "No matchingcommands" message when there are no matches, or a scrollable list of the filtered commands with the selected item highlighted and mouse handlers wired for selection and execution.
 */
export function CommandMenu({
    query,
    selectedIndex,
    scrollRef,
    onSelect,
    onExecute
}: CommandMenuProps) {
    const filtered = getFilteredCommands(query);
    const visibleHeight = Math.min(filtered.length, MAX_VISIBLE_ITEMS)

    if (filtered.length === 0) {
        return (
            <box paddingX={1}>
                <text attributes={TextAttributes.DIM}>No matchingcommands</text>
            </box>
        )
    }

    return (
        <scrollbox ref={scrollRef} height={visibleHeight}>
            {filtered.map((cmd, i) => {
                const isSelected = i === selectedIndex;
                return (
                    <box
                        key={cmd.value}
                        flexDirection="row"
                        paddingX={1}
                        height={1}
                        overflow="hidden"
                        backgroundColor={isSelected ? '#89b4f4' : undefined}
                        onMouseDown={() => onExecute(i)}
                        onMouseMove={() => onSelect(i)}
                    >
                        <box flexShrink={0} width={COMMAND_COL_WIDTH}>
                            <text selectable={false} fg={isSelected ? "black" : "white"}>/{cmd.name}</text>
                        </box>
                        <box flexGrow={1} flexShrink={1} overflow="hidden">
                            <text selectable={false} fg={isSelected ? "black" : "gray"}>{cmd.description}</text>
                        </box>
                    </box>
                )
            })}
        </scrollbox>
    )
}