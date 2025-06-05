import { EmbedBuilder } from "discord.js";
import client from "../client/client.js";
import logger from "../logging/logger.js";
import sendMessage from "./sendMessage.js";
import { NormalizedGuild } from "../interface.js";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function ban(userId: string, guildId: string, nsfwGuilds: NormalizedGuild[], reason: string) {
  try {
    const guild = await client.guilds.fetch(guildId);
    const user = await client.users.fetch(userId);

    // prettier-ignore
    const embed = new EmbedBuilder()
    .setTitle(`You Have Been Banned From ${guild.name}`)
    .setDescription(
      `You have been banned from **${guild.name}** due to your membership in the following servers:\n\n` +
      `${nsfwGuilds.map((g) => `• ${g.name}`).join("\n")}\n\n` +
      `Membership in these servers is not allowed. We kindly ask that you leave them.\n` +
      `Once you've done so, you may appeal for an unban.`
    )
    .setColor("Red");

    try {
      await sendMessage(userId, embed);
    } catch (dmError) {
      await logger.warn(`Could not DM user ${userId}: ${dmError}`);
    }

    await delay(2000);
    await guild.bans.create(userId, { reason });
    await logger.info(`User ${user.tag} (${user.id}) was banned from ${guild.name}`);

    await delay(5000);
    await guild.bans.remove(userId);
    await logger.info(`User ${user.tag} (${user.id}) was unbanned from ${guild.name}`);
  } catch (error) {
    await logger.error(`Could not ban user ${userId}: ${error}`);
  }
}

export default ban;
