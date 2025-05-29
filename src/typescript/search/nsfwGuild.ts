import { NormalizedGuild } from "../interface.js";
import logger from "../logging/logger.js";

function checkForNsfwGuild(userGuilds: NormalizedGuild[]): boolean {
  let found: boolean = false;
  userGuilds.forEach(async (guild) => {
    if (guild.id === "1369306306682556447") {
      console.log(`user is in ${guild.name}`);
      await logger.info(`user is in ${guild.name}`);
      return (found = true);
    }
  });
  return found;
}

export default checkForNsfwGuild;
