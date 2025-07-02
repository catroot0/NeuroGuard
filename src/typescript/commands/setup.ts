import { ChatInputCommandInteraction, MessageFlags, GuildBasedChannel, APIRole, Role } from "discord.js";
import { invalidChannelErrorEmbed, invalidRoleErrorEmbed, setupSuccessfulEmbed, setupFailedErrorEmbed, invalidAppealLinkErrorEmbed, isInDatabaseErrorEmbed } from "../helpers/embeds.js";
import logger from "../logging/logger.js";
import post from "../database/post.js";
import isTextChannel from "../helpers/isTextChannel.js";
import isAValidRole from "../helpers/isAValidRole.js";
import isDiscordLink from "../helpers/isDiscordLink.js";
import isInDatabase from "../helpers/isInDatabase.js";

async function setup(interaction: ChatInputCommandInteraction) {
  try {
    const verifyChannel = interaction.options.getChannel("verification_channel", true) as GuildBasedChannel;
    const memberRole: Role | APIRole = interaction.options.getRole("member_role", true);
    const appealLink: string = interaction.options.getString("appeal_server", true);

    if (!isTextChannel(verifyChannel)) {
      return await interaction.reply({ embeds: [invalidChannelErrorEmbed], flags: [MessageFlags.Ephemeral] });
    }

    if (!isAValidRole(memberRole, interaction.guild!.id)) {
      return await interaction.reply({ embeds: [invalidRoleErrorEmbed], flags: [MessageFlags.Ephemeral] });
    }

    if (!isDiscordLink(appealLink)) {
      return await interaction.reply({ embeds: [invalidAppealLinkErrorEmbed], flags: [MessageFlags.Ephemeral] })
    }

    if (await isInDatabase(interaction.guild!.id)) {
      return await interaction.reply({ embeds: [isInDatabaseErrorEmbed], flags: [MessageFlags.Ephemeral] })
    }

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    const postedSuccessfully = await post(interaction.guild!.id, appealLink, memberRole.id, verifyChannel.id)

    if (postedSuccessfully) {
      await interaction.followUp({ embeds: [setupSuccessfulEmbed] });
    } else {
      await interaction.followUp({ embeds: [setupFailedErrorEmbed] });
    }
  } catch (error) {
    await logger.error(`unexpected error happened during the setup command! ${error}`);
    console.log(`unexpected error happened during the setup command! ${error}`);
  }
}

export default setup;
