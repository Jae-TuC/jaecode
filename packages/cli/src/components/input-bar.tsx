import type { KeyBinding, TextareaRenderable } from "@opentui/core";
import { EmptyBorder } from "./border";
import { StatusBar } from "./status-bar";
import { useCommandMenu } from "./command-menu/use-command-menu"
import { useCallback, useEffect, useRef } from "react";
import { useRenderer } from "@opentui/react";
import type { Command } from "./command-menu/types";
import { CommandMenu } from "./command-menu";
import { useToast } from "../providers/toasts";
import { useKeyboardLayer } from "../providers/keyboard-layer";
import { useDialog } from "../providers/dialog";
import { useTheme } from "../providers/themes";

type Props = {
    onSubmit: (text: string) => void;
    disabled?: boolean;
}

export const TEXTAREA_KEY_BINDINGS: KeyBinding[] = [
    { name: "return", action: "submit" },
    { name: "enter", action: "submit" },
    { name: "return", shift: true, action: "newline" },
    { name: "enter", shift: true, action: "newline" },
]

/**
 * Render an input bar with a textarea, an optional command menu overlay, and a status bar.
 *
 * The textarea uses predefined key bindings (Enter/Return to submit, Shift+Enter/Shift+Return to insert a newline).
 * When the command menu is visible, submitting executes the currently selected command instead of sending text:
 * - If the resolved command exposes an `action`, that action is invoked with an `exit()` callback which destroys the renderer.
 * - Otherwise the command's `value` is inserted into the textarea.
 *
 * @param onSubmit - Callback invoked with the trimmed textarea text when a submit completes (ignored if text is empty or component is disabled).
 * @param disabled - When true, disables submission and prevents the textarea from receiving focus. Defaults to `false`.
 * @returns The rendered input bar element.
 */
export function InputBar({ onSubmit, disabled = false }: Props) {
    const textareaRef = useRef<TextareaRenderable>(null)
    const onSubmitRef = useRef<() => void>(() => { });
    const renderer = useRenderer();
    const toast = useToast()
    const dialog = useDialog()
    const { isTopLayer, setResponder } = useKeyboardLayer()
    const { colors } = useTheme()

    const {
        showCommandMenu,
        selectedIndex,
        setSelectedIndex,
        resolveCommand,
        handleContentChange,
        commandQuery,
        scrollRef
    } = useCommandMenu();

    const handleCommand = useCallback((command: Command | undefined) => {
        const textarea = textareaRef.current;
        if (!textarea && !command) return;

        textarea?.setText("");
        if (command?.action) {
            command.action({
                exit: () => renderer.destroy(),
                toast,
                dialog
            })
        } else {
            textarea?.insertText(command?.value || "")
        }
    }, [renderer, dialog, toast])

    const handleCommandExecute = useCallback((index: number) => {
        const command = resolveCommand(index);
        handleCommand(command);
    }, [resolveCommand, handleCommand])

    const handleTextareaContentChange = useCallback(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        handleContentChange(textarea.plainText);
    }, [])

    const handleSubmit = useCallback(() => {
        if (disabled) return;

        const textarea = textareaRef.current;
        if (!textarea) return

        const text = textarea.plainText.trim();
        if (text.length === 0) return;

        onSubmit(text);
    }, [disabled, onSubmit])

    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.onSubmit = () => {
            onSubmitRef.current();
        }
    }, [])

    onSubmitRef.current = () => {
        if (disabled) return;

        if (showCommandMenu) {
            const command = resolveCommand(selectedIndex);
            handleCommand(command);
            return;
        }

        handleSubmit();
    }

    useEffect(() => {
        setResponder("base", () => {
            if (disabled) return false;

            const textarea = textareaRef.current;
            if (textarea && textarea.plainText.length > 0) {
                textarea.setText("");
                return true
            }

            return false
        })

        return () => setResponder("base", null)
    }, [disabled, setResponder])

    return (
        <box width="100%" alignItems="center">
            <box
                border={["left"]}
                borderColor={colors.primary}
                customBorderChars={{
                    ...EmptyBorder,
                    vertical: "┃",
                    bottomLeft: "┗",
                    topLeft: "┏",
                }}
                width="100%"
            >
                <box
                    position="relative"
                    justifyContent="center"
                    paddingX={2}
                    paddingY={1}
                    backgroundColor={colors.surface}
                    width="100%"
                    gap={1}
                >
                    {showCommandMenu && (
                        <box
                            position="absolute"
                            bottom="100%"
                            left={0}
                            width="100%"
                            backgroundColor={colors.surface}
                            zIndex={10}
                        >
                            <CommandMenu
                                query={commandQuery}
                                selectedIndex={selectedIndex}
                                scrollRef={scrollRef}
                                onSelect={setSelectedIndex}
                                onExecute={handleCommandExecute}
                            />
                        </box>
                    )}

                    <textarea
                        ref={textareaRef}
                        focused={!disabled && (isTopLayer("base") || isTopLayer("command"))}
                        keyBindings={TEXTAREA_KEY_BINDINGS}
                        onContentChange={handleTextareaContentChange}
                        placeholder={`Ask anything... "Fix bug in database"`}
                    />
                    <StatusBar />
                </box>
            </box>
        </box>
    )
}