import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { NormalizedGuild } from "../interface.js";
import client from "../client/client.js";
import logger from "../logging/logger.js";
import sendMessage from "./sendMessage.js";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function ban(userId: string, guildId: string, nsfwGuilds: NormalizedGuild[], reason: string) {
  try {
    const guild = await client.guilds.fetch(guildId);
    const user = await client.users.fetch(userId);

    const guildList = nsfwGuilds.map((g) => `• ${g.name}`).join("\n");

    const embed = new EmbedBuilder()
      .setTitle(`You Have Been Banned From ${guild.name}`)
      .setDescription(`You have been banned from **${guild.name}** due to your membership in the following servers:\n\n` + `${guildList}\n\n` + `Membership in these servers is not allowed. We kindly ask that you leave them.\n` + `Once you've done so, you may appeal for an unban.`)
      .setColor("Red");

    const button = new ButtonBuilder()
      .setLabel("Appeal Server")
      .setStyle(ButtonStyle.Link)
      .setURL("https://www.google.com"); //! temp url

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

    try {
      await sendMessage(userId, embed, row);
    } catch (dmError) {
      await logger.warn(`Could not DM user ${userId}: ${dmError}`);
    }

    await delay(2000);

    try {
      await guild.bans.create(userId, { reason });
      await logger.info(`User ${user.tag} (${user.id}) was banned from ${guild.name}`);
    } catch (banErr) {
      await logger.error(`Failed to ban user ${user.tag}: ${banErr}`);
      return;
    }
    //! remove later
    await delay(5000);

    try {
      await guild.bans.remove(userId);
      await logger.info(`User ${user.tag} (${user.id}) was unbanned from ${guild.name}`);
    } catch (unbanErr) {
      await logger.error(`Failed to unban user ${user.tag}: ${unbanErr}`);
    }
  } catch (error) {
    await logger.error(`Could not ban user ${userId}: ${error}`);
  }
}

export default ban;
