import { RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";

// Normalizing slash commands because Discord loves being a bitch :)
function normalizeSlashCommands(cmds: any[]): RESTPostAPIChatInputApplicationCommandsJSONBody[] {
  return cmds.map((cmd) => ({
    name: cmd.name,
    description: cmd.description,
    type: cmd.type,
    options: (cmd.options ?? []).map((opt: any) => ({
      name: opt.name,
      description: opt.description,
      type: opt.type,
      required: opt.required ?? false,
      choices: opt.choices ?? [],
      options: opt.options ?? [],
    })),
  }));
}

export default normalizeSlashCommands;
