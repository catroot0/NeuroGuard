import { DiscordGuild, NormalizedGuild } from "../interface.js";

// Convert raw guild data from Discord into a simplified, normalized format
// This makes it easier to work with the guild info later in your app
function normalizeUserGuilds(guilds: DiscordGuild[]): NormalizedGuild[] {
  return guilds.map((guild) => ({
    name: guild.name,     // Guild name
    id: guild.id,         // Guild ID
    icon: guild.icon,     // Guild icon hash (can be null)
    banner: guild.banner, // Guild banner hash (can be null)
    isOwner: guild.owner, // Boolean if the user is owner of the guild
  }));
}

export default normalizeUserGuilds;
