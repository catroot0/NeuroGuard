import axios from "axios";
import logger from "../logging/logger.js";
import { databaseUrl } from "../config.js";
import { GuildResponse } from "../interface.js";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 300;

async function get(guildId: string): Promise<GuildResponse | null> {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      await logger.info(`Fetching guild with ID: ${guildId} (attempt ${attempt + 1})`);
      console.log(`Fetching guild with ID: ${guildId} (attempt ${attempt + 1})`);

      const res = await axios.get(`${databaseUrl}/guilds.json`, {
        params: {
          orderBy: '"id"',
          equalTo: `"${guildId}"`
        }
      });

      const data = res.data;
      const keys = Object.keys(data);

      if (keys.length === 0) {
        if (attempt < MAX_RETRIES - 1) {
          await new Promise(res => setTimeout(res, RETRY_DELAY_MS));
          continue;
        }

        await logger.info("Guild not found in database.");
        console.log("Guild not found in database.");
        return null;
      }

      const key = keys[0];
      const guildData = data[key];

      await logger.info("Guild found.");
      console.log("Guild found:", guildData);

      return { key, data: guildData };
    } catch (error) {
      await logger.error("Error fetching guild.");
      console.error("Error fetching guild:", error);
      return null;
    }
  }

  return null;
}

export default get;
