import { ChatInputCommandInteraction, MessageFlags, EmbedBuilder, GuildBasedChannel, APIRole, Role } from "discord.js";
import logger from "../logging/logger.js";
import post from "../database/post.js";
import isTextChannel from "../helpers/isTextChannel.js";
import isAValidRole from "../helpers/isAValidRole.js";

async function setup(interaction: ChatInputCommandInteraction) {
  try {
    const verifyChannel = interaction.options.getChannel("verification_channel", true) as GuildBasedChannel;
    const memberRole: Role | APIRole = interaction.options.getRole("member_role", true);
    const appealLink: string = interaction.options.getString("appeal_server", true);

    if (!isTextChannel(verifyChannel)) {
      const errorEmbed = new EmbedBuilder()
        .setTitle("Invalid Channel")
        .setDescription("Please select a text channel for verification. Voice channels are not supported.")
        .setColor("Red");

      return interaction.reply({ embeds: [errorEmbed], flags: [MessageFlags.Ephemeral] });
    }

    if (!isAValidRole(memberRole, interaction.guild!.id)) {
      const errorEmbed = new EmbedBuilder()
        .setTitle("Invalid Role")
        .setDescription("You can't use bot roles, integration roles, or @everyone. Choose a normal user role.")
        .setColor("Red");

      return interaction.reply({ embeds: [errorEmbed], flags: [MessageFlags.Ephemeral] });
    }

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    const postedSuccessfully = await post(interaction.guild!.id, appealLink, memberRole.id, verifyChannel.id)

    if (postedSuccessfully) {
      const embed = new EmbedBuilder()
        .setTitle("Setup Successful!")
        .setDescription("Your server has been configured successfully. You can now use all features.")
        .setColor("Green")
        .setFooter({ text: "Thank you for using Neuro Guard!" });

      await interaction.followUp({ embeds: [embed] });
    } else {
      const errorEmbed = new EmbedBuilder()
        .setTitle("Setup Failed")
        .setDescription("Something went wrong while saving your configuration. Please try again later or contact support.")
        .setColor("Red")
        .setFooter({ text: "If this issue persists, please report it." });

      await interaction.followUp({ embeds: [errorEmbed] });
    }
  } catch (error) {
    await logger.error(`unexpected error happened during the setup command! ${error}`);
    console.log(`unexpected error happened during the setup command! ${error}`);
  }
}

export default setup;
