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
      .setTitle(`You Has Been Banned From ${guild.name}`)
      .setDescription(
        `Unfortunately, You Has Been Banned From ${guild.name}.\n` +
        `You Are In \n ${nsfwGuilds.map((guild) => guild.name).join("\n ")} \n ***Which Is Not Allowed.*** We Would Really Appreciate If You Leave Those Servers And Appeal For Unban`
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
