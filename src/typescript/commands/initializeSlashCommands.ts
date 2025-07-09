import { RESTPostAPIChatInputApplicationCommandsJSONBody, SlashCommandBuilder } from "discord.js";

// Returns an array of slash commands to register with Discord
function initializeSlashCommands(): RESTPostAPIChatInputApplicationCommandsJSONBody[] {
  // Define the raw slash commands using the SlashCommandBuilder
  const rawCommands = [
    // /echo command - repeats a user-provided message
    new SlashCommandBuilder()
      .setName("echo")
      .setDescription("Repeat back the message you provide.")
      .addStringOption((option) =>
        option
          .setName("message") // name of the string option
          .setDescription("The message to repeat.") // option description
          .setRequired(true) // this option must be provided by the user
      ),

    // /verify command - initiates the server verification process
    new SlashCommandBuilder()
      .setName("verify")
      .setDescription("Begin the server verification process."),

    // /setup command - configures the bot for a server (verification channel, role, appeal server)
    new SlashCommandBuilder()
      .setName("setup")
      .setDescription("Configure Neuro Guard for your server.")
      .addChannelOption(option =>
        option
          .setName("verification_channel")
          .setDescription("Channel where people will use to verify their account.")
          .setRequired(true)
      )
      .addRoleOption(option => 
        option
          .setName("member_role")
          .setDescription("Role assigned to verified members.")
          .setRequired(true)
      )
      .addStringOption(option => 
        option
          .setName("appeal_server")
          .setDescription("Invite link of your appeal server.")
          .setRequired(true)
      ),

    // /reset command - resets the bot configuration for the current server
    new SlashCommandBuilder()
      .setName("reset")
      .setDescription("Resets the bot config for your server")
  ];

  // Convert the SlashCommandBuilder instances into raw JSON format for registration
  return rawCommands.map((command) => command.toJSON());
}

export default initializeSlashCommands;
