import client from "../client/client.js";
import logger from "../logging/logger.js";
import { TextChannel } from "discord.js";

async function changeChannelPermission(guildId: string, channelId: string): Promise<boolean | void> {
  try {
    const guild = client.guilds.cache.get(guildId);

    if (!guild) {
      console.error(`Guild ${guildId} not found.`);
      await logger.error(`Guild ${guildId} not found.`);
      return;
    }

    const channel = await guild.channels.fetch(channelId) as TextChannel;

    if (!channel) {
      console.error(`Channel ${channelId} not found in guild ${guildId}.`);
      await logger.error(`Channel ${channelId} not found in guild ${guildId}.`);
      return;
    }

    await logger.info(`Updating permissions for channel ${channel.id} in guild ${guild.id}.`);

    await channel.permissionOverwrites.edit(guild.roles.everyone, {
      SendMessages: true,
      ViewChannel: true,
      UseApplicationCommands: true
    });

    const successMsg = `Permissions successfully updated for channel ${channel.id} in guild ${guild.id}.`;
    console.log(successMsg);
    await logger.info(successMsg);
    return true;
  } catch (error) {
    console.error("Failed to change channel permissions:", error);
    await logger.error(`Error while changing channel permissions: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export default changeChannelPermission;
