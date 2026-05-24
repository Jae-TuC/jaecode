import type { Command } from "./types"

export const COMMANDS: Command[] = [
    {
        name: 'new',
        description: 'Create a new project',
        value: '/new'
    },
    {
        name: "agents",
        description: "List all agents",
        value: "/agents"
    },
    {
        name: "models",
        description: "Select AI model for generation",
        value: "/models"
    },
    {
        name: "sessions",
        description: "Browse past sessions and conversations",
        value: "/sessions"
    },
    {
        name: "theme",
        description: "Change theme color",
        value: "/theme"
    },
    {
        name: "login",
        description: "Sign in with your browser",
        value: "/login"
    },
    {
        name: "logout",
        description: "Sign out of your account",
        value: "/logout"
    },
    {
        name: "upgrade",
        description: "Buy more credits",
        value: "/upgrade"
    },
    {
        name: "usage",
        description: "Open billing portal in your browser",
        value: "/usage"
    },
    {
        name: 'exit',
        description: 'Exit the application',
        value: '/exit',
        action: (ctx) => {
            ctx.exit()
        },
    }
]