export type ThemeColors = {
    primary: string;
    planMode: string;
    selection: string;
    thinking: string;
    success: string;
    error: string;
    info: string;
    background: string;
    surface: string;
    dialogSurface: string;
    thinkingBorder: string;
    dimSeparator: string
}

export type Theme = {
    name: string;
    colors: ThemeColors
}

export const THEMES: Theme[] = [
    {
        name: "Nightfox",
        colors: {
            primary: "#56d6c2",
            planMode: "#cf8ef4",
            selection: "#89b4fa",
            thinking: "#cf8ef4",
            success: "#82e0aa",
            error: "#e74c5e",
            info: "#56d6c2",
            background: "#0d0d12",
            surface: "#1a1a24",
            dialogSurface: "#0a0a10",
            thinkingBorder: "#34344a",
            dimSeparator: "#4e4e66"
        }
    },
    {
        name: "Dracula",
        colors: {
            primary: "#bd93f9",
            planMode: "#ffb86c",
            selection: "#8be9fd",
            thinking: "#f1fa8c",
            success: "#50fa7b",
            error: "#ff5555",
            info: "#8be9fd",
            background: "#282a36",
            surface: "#44475a",
            dialogSurface: "#21222c",
            thinkingBorder: "#6272a4",
            dimSeparator: "#44475a",
        },
    },
    {
        name: "Catppuccin Mocha",
        colors: {
            primary: "#cba6f7",
            planMode: "#f9e2af",
            selection: "#89b4fa",
            thinking: "#f5c2e7",
            success: "#a6e3a1",
            error: "#f38ba8",
            info: "#89dceb",
            background: "#1e1e2e",
            surface: "#313244",
            dialogSurface: "#181825",
            thinkingBorder: "#585b70",
            dimSeparator: "#45475a",
        },
    },
    {
        name: "Tokyo Night",
        colors: {
            primary: "#7aa2f7",
            planMode: "#e0af68",
            selection: "#73daca",
            thinking: "#bb9af7",
            success: "#9ece6a",
            error: "#f7768e",
            info: "#7dcfff",
            background: "#1a1b26",
            surface: "#2d2e3a",
            dialogSurface: "#16161e",
            thinkingBorder: "#3b3b4a",
            dimSeparator: "#414868",
        },
    },
    {
        name: "Nord",
        colors: {
            primary: "#88c0d0",
            planMode: "#b48ead",
            selection: "#5e81ac",
            thinking: "#81a1c1",
            success: "#a3be8c",
            error: "#bf616a",
            info: "#88c0d0",
            background: "#2e3440",
            surface: "#3b4252",
            dialogSurface: "#242932",
            thinkingBorder: "#4c566a",
            dimSeparator: "#4c566a",
        },
    },
    {
        name: "Gruvbox Dark",
        colors: {
            primary: "#fabd2f",
            planMode: "#d65d0e",
            selection: "#83a598",
            thinking: "#b8bb26",
            success: "#98971a",
            error: "#cc241d",
            info: "#83a598",
            background: "#282828",
            surface: "#3c3836",
            dialogSurface: "#1d2021",
            thinkingBorder: "#504945",
            dimSeparator: "#504945",
        },
    },
    {
        name: "One Dark",
        colors: {
            primary: "#61afef",
            planMode: "#e5c07b",
            selection: "#98c379",
            thinking: "#c678dd",
            success: "#98c379",
            error: "#e06c75",
            info: "#56b6c2",
            background: "#282c34",
            surface: "#3e4452",
            dialogSurface: "#1e222a",
            thinkingBorder: "#528bff",
            dimSeparator: "#3e4452",
        },
    },
    {
        name: "Solarized Dark",
        colors: {
            primary: "#268bd2",
            planMode: "#cb4b16",
            selection: "#2aa198",
            thinking: "#b58900",
            success: "#859900",
            error: "#dc322f",
            info: "#6c71c4",
            background: "#002b36",
            surface: "#073642",
            dialogSurface: "#00161f",
            thinkingBorder: "#586e75",
            dimSeparator: "#586e75",
        },
    },
    {
        name: "Monokai Classic",
        colors: {
            primary: "#f92672",
            planMode: "#fd971f",
            selection: "#66d9ef",
            thinking: "#e6db74",
            success: "#a6e22e",
            error: "#f92672",
            info: "#66d9ef",
            background: "#272822",
            surface: "#3e3d32",
            dialogSurface: "#1b1c18",
            thinkingBorder: "#75715e",
            dimSeparator: "#49483e",
        },
    },
    {
        name: "Rosé Pine",
        colors: {
            primary: "#c4a7e7",
            planMode: "#f6c177",
            selection: "#ebbcba",
            thinking: "#e0def4",
            success: "#9ccfd8",
            error: "#eb6f92",
            info: "#9ccfd8",
            background: "#191724",
            surface: "#1f1d2e",
            dialogSurface: "#100f17",
            thinkingBorder: "#403d52",
            dimSeparator: "#26233a",
        },
    },
    {
        name: "Synthwave 84",
        colors: {
            primary: "#ff6ad5",
            planMode: "#f7b731",
            selection: "#36f9f6",
            thinking: "#f7b731",
            success: "#05f9a7",
            error: "#ff2a6d",
            info: "#36f9f6",
            background: "#241b2e",
            surface: "#362b48",
            dialogSurface: "#170f1f",
            thinkingBorder: "#5f4a72",
            dimSeparator: "#4a3b5e",
        },
    },
    {
        name: "Everforest Dark",
        colors: {
            primary: "#a7c080",
            planMode: "#dbbc7f",
            selection: "#7fbbb3",
            thinking: "#e67e80",
            success: "#a7c080",
            error: "#e67e80",
            info: "#7fbbb3",
            background: "#2d353b",
            surface: "#3c474d",
            dialogSurface: "#21282d",
            thinkingBorder: "#4f5b58",
            dimSeparator: "#4f5b58",
        },
    },
    {
        name: "Ayu Dark",
        colors: {
            primary: "#ffb454",
            planMode: "#f29e74",
            selection: "#59c2ff",
            thinking: "#ffb454",
            success: "#b8cc52",
            error: "#ff3333",
            info: "#59c2ff",
            background: "#0a0e14",
            surface: "#151a22",
            dialogSurface: "#06080b",
            thinkingBorder: "#2c3341",
            dimSeparator: "#2c3341",
        },
    },
]

export const DEFAULT_THEME = THEMES.find((t) => t.name === "Nightfox")!