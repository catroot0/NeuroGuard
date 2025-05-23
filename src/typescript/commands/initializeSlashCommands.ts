import { RESTPostAPIChatInputApplicationCommandsJSONBody, SlashCommandBuilder } from "discord.js";

//long story short, it returns a array of the commands... don't blame me for this LONGASS type name >:(
function initializeSlashCommands(): RESTPostAPIChatInputApplicationCommandsJSONBody[] {
  const rawCommands = [
    new SlashCommandBuilder()
      .setName("echo")
      .setDescription("Replies With Your Input!")
      .addStringOption((option) => {
        // prettier-ignore
        return option.setName("input")
      .setDescription("The Input To Echo Bach")
      .setRequired(true)
      }),
  ];

  const commands = rawCommands.map((command) => command.toJSON());
  return commands;
}

export default initializeSlashCommands;
