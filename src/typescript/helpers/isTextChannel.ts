import { ChannelType, GuildBasedChannel } from "discord.js";

/**
 * Checks if a given channel is a text-based channel suitable for sending messages.
 * 
 * @param channel - The Discord channel to check.
 * @returns boolean - True if the channel is a text channel or announcement channel.
 */
function isTextChannel(channel: GuildBasedChannel): boolean {
  return [
    ChannelType.GuildText,        // Standard text channels in guilds
    ChannelType.GuildAnnouncement // Announcement channels (news channels)
  ].includes(channel.type);
}

export default isTextChannel;
