import axios from "axios";
import logger from "../logging/logger.js";
import { databaseUrl } from "../config.js";
import { GuildResponse } from "../interface.js";

const maxRetries = 3;
const retryDelayMs = 300;

async function get(guildId: string): Promise<GuildResponse | false | null> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      await logger.info(`Fetching guild with ID: ${guildId} (Attempt ${attempt + 1})`);
      console.log(`Fetching guild with ID: ${guildId} (Attempt ${attempt + 1})`);

      const res = await axios.get(`${databaseUrl}/guilds.json`, {
        params: {
          orderBy: '"id"',
          equalTo: `"${guildId}"`
        }
      });

      const data = res.data;
      const keys = Object.keys(data);

      if (keys.length === 0) {
        if (attempt < maxRetries - 1) {
          await new Promise(res => setTimeout(res, retryDelayMs));
          continue;
        }

        await logger.info("Guild not found in database.");
        console.log("Guild not found in database.");
        return false;
      }

      const key = keys[0];
      const guildData = data[key];

      await logger.info("Guild found.");
      console.log("Guild found:", guildData);

      return { key, data: guildData };
    } catch (error) {
      await logger.error("Error fetching guild.");
      await logger.error(error);
      console.error("Error fetching guild");
      return null;
    }
  }

  return null;
}

export default get;
