import { useCallback, useEffect, useRef } from "react";
import { useDialog } from "../../providers/dialog";
import { useTheme } from "../../providers/themes";
import { DialogSearchList } from "../dialog-search-list";
import { THEMES } from "../../theme";
import type { Theme } from "../../theme";

export function ThemeDialogContent() {
    const dialog = useDialog()
    const { setTheme, currentTheme } = useTheme()
    const originalThemeRef = useRef(currentTheme)

    const confirmRef = useRef(false)

    useEffect(() => {
        return () => {
            if (!confirmRef.current) {
                setTheme(originalThemeRef.current)
            }
        }
    }, [setTheme])

    const handleSelect = useCallback((theme: Theme) => {
        confirmRef.current = true
        setTheme(theme)
        dialog.close()
    }, [setTheme, dialog])

    const handleHightlight = useCallback((theme: Theme) => {
        setTheme(theme)
    }, [setTheme])

    return (
        <DialogSearchList
            items={THEMES}
            onSelect={handleSelect}
            onHighlight={handleHightlight}
            filterFn={(t, query) => t.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())}
            renderItem={(theme, isSelected) => (
                <text
                    selectable={false} fg={isSelected ? "black" : "white"}
                >
                    {theme.name === originalThemeRef.current.name
                        ? "\u0020\u2022\u0020"
                        : "\u0020\u0020\u0020"
                    }
                    {theme.name}
                </text>
            )}
            getKey={(t) => t.name}
            placeholder="Search theme"
            emptyText="No matching themes"
        />
    )
}

// items: T[];
// onSelect: (item: T) => void;
// onHighlight ?: (item: T) => void;
// filterFn: (item: T, query: string) => boolean;
// renderItem: (item: T, isSelected: boolean) => ReactNode;
// getKey: (item: T) => string;
// placeholder ?: string;
// emptyText ?: string