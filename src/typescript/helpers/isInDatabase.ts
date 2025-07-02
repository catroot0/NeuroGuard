import get from "../database/get.js"

async function isInDatabase(guildId: string): Promise<boolean> {
  return Boolean(await get(guildId));
}

export default isInDatabase