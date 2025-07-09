import { DiscordGuild } from "../interface.js";

/**
 * Normalizes an array of Discord guild objects to a simplified format.
 * This extracts only the relevant properties needed by the application.
 *
 * @param guilds - Array of guild objects fetched from Discord API
 * @returns Array of normalized guild objects with selected properties
 */
function normalizeUserGuilds(guilds: DiscordGuild[]) {
  return guilds.map((guild) => ({
    name: guild.name,       // Guild name
    id: guild.id,           // Guild ID (unique identifier)
    icon: guild.icon,       // Guild icon hash (nullable)
    banner: guild.banner,   // Guild banner hash (nullable)
    isOwner: guild.owner,   // Whether the user owns this guild (boolean)
  }));
}

export default normalizeUserGuilds;
