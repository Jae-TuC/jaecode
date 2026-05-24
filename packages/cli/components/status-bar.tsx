import { TextAttributes } from "@opentui/core";

/**
 * Render a horizontal status bar showing a build label and the current version.
 *
 * Displays "Build", a dimmed separator "›", and "Opus 4.6" aligned horizontally with spacing.
 *
 * @returns A JSX element containing the status bar UI
 */
export function StatusBar() {
    return (
        <box flexDirection="row" gap={1}>
            <text fg="cyan">Build</text>
            <text attributes={TextAttributes.DIM} fg="gray">›</text>
            <text fg="cyan">Opus 4.6</text>
        </box>
    )
}