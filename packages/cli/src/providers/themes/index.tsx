import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { homedir } from "node:os"

import { useState, useCallback, createContext, useContext } from "react"
import type { ReactNode } from "react"
import type { ThemeColors, Theme } from "../../theme"
import { DEFAULT_THEME, THEMES } from "../../theme"

const CONFIG_DIR = join(homedir(), ".jaecode")
const THEME_PREFERENCE_PATH = join(CONFIG_DIR, "preference.json")

type ThemePreferences = {
    themeName: string
}

function getInitialTheme(): Theme {
    try {
        const preferences = JSON.parse(
            readFileSync(THEME_PREFERENCE_PATH, "utf-8")
        ) as Partial<ThemePreferences>;

        const saveTheme = THEMES.find((theme) => theme.name === preferences.themeName)
        return saveTheme ?? DEFAULT_THEME!;
    } catch (error) {
        return DEFAULT_THEME!
    }
}

function persistTheme(theme: Theme) {
    try {
        mkdirSync(CONFIG_DIR, { recursive: true })
        writeFileSync(
            THEME_PREFERENCE_PATH,
            JSON.stringify({ themeName: theme.name } satisfies ThemePreferences, null, 2),
            "utf-8"
        )
    } catch (error) {

    }
}


type ThemeContextValue = {
    colors: ThemeColors,
    currentTheme: Theme,
    setTheme: (theme: Theme) => void;
}


const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme(): ThemeContextValue {
    const value = useContext(ThemeContext)

    if (!value) {
        throw new Error("useTheme must be used inside a ThemeProvider")
    }

    return value
}


type ThemeProviderProps = {
    children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [currentTheme, setCurrentTheme] = useState<Theme>(getInitialTheme)

    const setTheme = useCallback((theme: Theme) => {
        setCurrentTheme(theme)
        persistTheme(theme)
    }, [])

    return (
        <ThemeContext.Provider value={{ colors: currentTheme.colors, currentTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}