import { NormalizedGuild } from "../interface.js";
import logger from "../logging/logger.js";

async function checkForNsfwGuild(userGuilds: NormalizedGuild[]): Promise<boolean> {
  for (const guild of userGuilds) {
    if (guild.id === "1369306306682556447") {
      console.log(`user is in ${guild.name} banning!`);
      await logger.info(`user is in ${guild.name} banning!`);
      return true;
    }
  }
  return false;
}

export default checkForNsfwGuild;
