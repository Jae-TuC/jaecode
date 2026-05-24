import type { Command } from './types'
import { COMMANDS } from './command'

export function getFilteredCommands(query: string): Command[] {
    if(!query.length) return COMMANDS;
    return COMMANDS.filter((cmd) => {
        return cmd.name.toLowerCase().startsWith(query.toLowerCase())
    })
}