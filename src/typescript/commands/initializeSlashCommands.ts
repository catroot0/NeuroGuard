import { RESTPostAPIChatInputApplicationCommandsJSONBody, SlashCommandBuilder } from "discord.js";

// Returns an array of slash commands to register with Discord
function initializeSlashCommands(): RESTPostAPIChatInputApplicationCommandsJSONBody[] {
  const rawCommands = [
    new SlashCommandBuilder()
      .setName("echo")
      .setDescription("Replies with your input.")
      .addStringOption((option) =>
        option
          .setName("input")
          .setDescription("The input to echo back.")
          .setRequired(true)
      ),

    new SlashCommandBuilder()
      .setName("verify")
      .setDescription("Start the verification process to access the server."),
  ];

  return rawCommands.map((command) => command.toJSON());
}

export default initializeSlashCommands;
