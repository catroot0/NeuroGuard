import { ChatInputCommandInteraction, MessageFlags, GuildBasedChannel, APIRole, Role } from "discord.js";
import { invalidChannelErrorEmbed, invalidRoleErrorEmbed, setupSuccessfulEmbed, setupFailedErrorEmbed, invalidAppealLinkErrorEmbed, isInDatabaseErrorEmbed } from "../helpers/embeds.js";
import logger from "../logging/logger.js";
import post from "../database/post.js";
import isTextChannel from "../helpers/isTextChannel.js";
import isAValidRole from "../helpers/isAValidRole.js";
import isDiscordLink from "../helpers/isDiscordLink.js";
import isInDatabase from "../helpers/isInDatabase.js";
import changeChannelPermission from "../actions/changeChannelPermission.js";

async function setup(interaction: ChatInputCommandInteraction) {
  try {
    const verifyChannel = interaction.options.getChannel("verification_channel", true) as GuildBasedChannel;
    const memberRole: Role | APIRole = interaction.options.getRole("member_role", true);
    const appealLink: string = interaction.options.getString("appeal_server", true);

    await interaction.deferReply({flags: [MessageFlags.Ephemeral]})

    if (!isTextChannel(verifyChannel)) {
      return await interaction.followUp({ embeds: [invalidChannelErrorEmbed]});
    }

    if (!isAValidRole(memberRole, interaction.guild!.id)) {
      return await interaction.followUp({ embeds: [invalidRoleErrorEmbed]});
    }

    if (!isDiscordLink(appealLink)) {
      return await interaction.followUp({ embeds: [invalidAppealLinkErrorEmbed] })
    }

    if (await isInDatabase(interaction.guild!.id)) {
      return await interaction.followUp({ embeds: [isInDatabaseErrorEmbed] })
    }

    const postedSuccessfully = await post(interaction.guild!.id, appealLink, memberRole.id, verifyChannel.id)
    const changedChannelPermsSuccessfully = await changeChannelPermission(interaction.guild!.id, verifyChannel.id, memberRole.id)
    if (postedSuccessfully && changedChannelPermsSuccessfully) {
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
