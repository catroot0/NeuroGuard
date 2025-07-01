import { ChannelType, GuildBasedChannel } from "discord.js";

function isTextChannel(channel: GuildBasedChannel): boolean {
  if (channel.type !== ChannelType.GuildText) {
    return false;
  } else {
    return true
  }
}

export default isTextChannel