import { ChannelType, GuildBasedChannel } from "discord.js";

function isTextChannel(channel: GuildBasedChannel): boolean {
  return [
    ChannelType.GuildText,
    ChannelType.GuildAnnouncement,
  ].includes(channel.type);
}

export default isTextChannel;
