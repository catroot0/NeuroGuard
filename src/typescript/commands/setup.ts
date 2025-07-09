import { ChatInputCommandInteraction, MessageFlags, GuildBasedChannel, APIRole, Role } from "discord.js";
import {
  invalidChannelErrorEmbed,
  invalidRoleErrorEmbed,
  setupSuccessfulEmbed,
  setupFailedErrorEmbed,
  invalidAppealLinkErrorEmbed,
  isInDatabaseErrorEmbed,
} from "../helpers/embeds.js";
import logger from "../logging/logger.js";
import post from "../database/post.js";
import isTextChannel from "../helpers/isTextChannel.js";
import isAValidRole from "../helpers/isAValidRole.js";
import isDiscordLink from "../helpers/isDiscordLink.js";
import isInDatabase from "../helpers/isInDatabase.js";
import changeChannelPermission from "../actions/changeChannelPermission.js";

async function setup(interaction: ChatInputCommandInteraction) {
  try {
    // Extracting required options from the command
    const verifyChannel = interaction.options.getChannel("verification_channel", true) as GuildBasedChannel;
    const memberRole: Role | APIRole = interaction.options.getRole("member_role", true);
    const appealLink: string = interaction.options.getString("appeal_server", true);

    // Defer the reply to allow more time for processing and make it ephemeral
    await interaction.deferReply({ flags: [MessageFlags.Ephemeral] });

    // Validate that the selected channel is a text-based channel
    if (!isTextChannel(verifyChannel)) {
      return await interaction.followUp({ embeds: [invalidChannelErrorEmbed] });
    }

    // Validate the selected role
    if (!isAValidRole(memberRole, interaction.guild!.id)) {
      return await interaction.followUp({ embeds: [invalidRoleErrorEmbed] });
    }

    // Check that the appeal link is a valid Discord invite
    if (!isDiscordLink(appealLink)) {
      return await interaction.followUp({ embeds: [invalidAppealLinkErrorEmbed] });
    }

    // Ensure the guild is not already in the database (i.e., not already set up)
    if (await isInDatabase(interaction.guild!.id)) {
      return await interaction.followUp({ embeds: [isInDatabaseErrorEmbed] });
    }

    // Save the setup data to the database
    const postedSuccessfully = await post(
      interaction.guild!.id,
      appealLink,
      memberRole.id,
      verifyChannel.id
    );

    // Modify the channel permissions accordingly
    const changedChannelPermsSuccessfully = await changeChannelPermission(
      interaction.guild!.id,
      verifyChannel.id,
      memberRole.id
    );

    // If both operations succeed, send success embed
    if (postedSuccessfully && changedChannelPermsSuccessfully) {
      await interaction.followUp({ embeds: [setupSuccessfulEmbed] });
    } else {
      // If either fails, send failure embed
      await interaction.followUp({ embeds: [setupFailedErrorEmbed] });
    }
  } catch (error) {
    // Log unexpected errors during setup
    await logger.error(`unexpected error happened during the setup command! ${error}`);
    console.log(`unexpected error happened during the setup command! ${error}`);
  }
}

export default setup;
