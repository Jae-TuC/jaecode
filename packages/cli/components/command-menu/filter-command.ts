import type { Command } from './types'
import { COMMANDS } from './command'

/**
 * Filters available commands by a case-insensitive prefix.
 *
 * @param query - The prefix to match against command names; an empty string returns all commands.
 * @returns The list of commands whose `name` starts with `query` (case-insensitive).
 */
export function getFilteredCommands(query: string): Command[] {
    if(!query.length) return COMMANDS;
    return COMMANDS.filter((cmd) => {
        return cmd.name.toLowerCase().startsWith(query.toLowerCase())
    })
}