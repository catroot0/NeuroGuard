import { ChannelType, RESTPostAPIChatInputApplicationCommandsJSONBody, SlashCommandBuilder } from "discord.js";

// Returns an array of slash commands to register with Discord
function initializeSlashCommands(): RESTPostAPIChatInputApplicationCommandsJSONBody[] {
  const rawCommands = [
    new SlashCommandBuilder()
      .setName("echo")
      .setDescription("Repeat back the message you provide.")
      .addStringOption((option) =>
        option
          .setName("message")
          .setDescription("The message to repeat.")
          .setRequired(true)
      ),

    new SlashCommandBuilder()
      .setName("verify")
      .setDescription("Begin the server verification process."),

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
      )
  ];

  return rawCommands.map((command) => command.toJSON());
}

export default initializeSlashCommands;
