import { ThemeDialogContent } from "../dialogs"
import type { Command } from "./types"

export const COMMANDS: Command[] = [
    {
        name: 'new',
        description: 'Create a new project',
        value: '/new',
        action: (ctx) => {
            ctx.toast.show({ message: "Starting new conversation" })
        }
    },
    {
        name: "agents",
        description: "List all agents",
        value: "/agents",
        // action: (ctx) => {
        //     ctx.toast.show({ message: "Switching agents..." })
        // }
        action: (ctx) => {
            ctx.dialog.open({
                title: "Select Mode",
                children: <text>Agent Selection comming soon...</text>
            })
        }
    },
    {
        name: "models",
        description: "Select AI model for generation",
        value: "/models",
        action: (ctx) => {
            ctx.toast.show({ message: "Selecting model..." })
        }
    },
    {
        name: "sessions",
        description: "Browse past sessions and conversations",
        value: "/sessions",
        action: (ctx) => {
            ctx.toast.show({ message: "Loading sessions..." })
        }
    },
    {
        name: "theme",
        description: "Change theme color",
        value: "/theme",
        action: (ctx) => {
            // ctx.toast.show({ message: "Opening theme picker..." })
            ctx.dialog.open({
                title: "Select theme",
                children: <ThemeDialogContent />
            })
        }
    },
    {
        name: "login",
        description: "Sign in with your browser",
        value: "/login",
        action: (ctx) => {
            ctx.toast.show({ message: "Opening your browser to sign in..." })
        }
    },
    {
        name: "logout",
        description: "Sign out of your account",
        value: "/logout",
        action: (ctx) => {
            ctx.toast.show({ message: "Sign out of your account", variant: "success" })
        }
    },
    {
        name: "upgrade",
        description: "Buy more credits",
        value: "/upgrade",
        action: (ctx) => {
            ctx.toast.show({ message: "Opening credit checkout" })
        }
    },
    {
        name: "usage",
        description: "Open billing portal in your browser",
        value: "/usage",
        action: (ctx) => {
            ctx.toast.show({ message: "Opening billing portal..." })
        }

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