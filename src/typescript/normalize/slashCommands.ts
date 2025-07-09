import { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";

// Normalize slash commands into the format Discord expects for registering commands
// (Because Discord's API can be picky about the structure)
function normalizeSlashCommands(cmds: any[]): RESTPostAPIChatInputApplicationCommandsJSONBody[] {
  return cmds.map((cmd) => ({
    name: cmd.name,
    description: cmd.description,
    type: cmd.type,
    options: (cmd.options ?? []).map((opt: any) => ({
      name: opt.name,
      description: opt.description,
      type: opt.type,
      required: opt.required ?? false, // Default to false if not specified
      choices: opt.choices ?? [],      // Default empty array if no choices
      options: opt.options ?? [],      // Nested options if any
    })),
  }));
}

export default normalizeSlashCommands;
