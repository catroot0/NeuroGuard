import { NormalizedGuild } from "../interface.js";
import logger from "../logging/logger.js";
import fs from "fs";

const rawNsfwGuildIds = fs.readFileSync("src/nsfwGuildIds.json", "utf-8");
const nsfwGuildIds: string[] = JSON.parse(rawNsfwGuildIds);

async function checkForNsfwGuild(userGuilds: NormalizedGuild[]): Promise<[boolean, NormalizedGuild[]]> {
  const nsfwGuilds: NormalizedGuild[] = [];

  for (const guild of userGuilds) {
    if (nsfwGuildIds.includes(guild.id)) {
      nsfwGuilds.push(guild);
      await logger.info(`User is in ${guild.name} (NSFW) - banning!`);
    }
  }
  console.log(nsfwGuilds);
  return [nsfwGuilds.length > 0, nsfwGuilds];
}

export default checkForNsfwGuild;
