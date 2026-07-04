import { TextAttributes } from "@opentui/core";
import { useTheme } from "../providers/themes";

/**
 * Render a horizontal status bar showing a build label and the current version.
 *
 * Displays "Build", a dimmed separator "›", and "Opus 4.6" aligned horizontally with spacing.
 *
 * @returns A JSX element containing the status bar UI
 */
export function StatusBar() {
    const { colors } = useTheme()
    return (
        <box flexDirection="row" gap={1}>
            <text fg={colors.primary}>Build</text>
            <text attributes={TextAttributes.DIM} fg={colors.dimSeparator}>›</text>
            <text fg={colors.planMode}>Opus 4.6</text>
        </box>
    )
}