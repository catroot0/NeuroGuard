import { GuildStore } from "../database/cache.js";

function isInDatabase(guildId: string): boolean {
  return Boolean(GuildStore.getById(guildId));
}

export default isInDatabase