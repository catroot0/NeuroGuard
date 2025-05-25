import { DiscordGuild } from "../interface.js";

function normalizeUserGuilds(guilds: DiscordGuild[]) {
  return guilds.map((guild) => ({
    name: guild.name,
    id: guild.id,
    icon: guild.icon,
    banner: guild.banner,
    isOwner: guild.owner,
  }));
}

export default normalizeUserGuilds;
