import { GuildStore } from "../database/cache.js";

/**
 * Checks if a guild with the given ID exists in the local GuildStore cache.
 * 
 * @param guildId - The Discord guild/server ID to check.
 * @returns boolean - True if the guild exists in the cache, otherwise false.
 */
function isInDatabase(guildId: string): boolean {
  return Boolean(GuildStore.getById(guildId));
}

export default isInDatabase;
