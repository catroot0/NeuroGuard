import axios from "axios";
import logger from "../logging/logger.js";
import { databaseUrl } from "../config.js";

async function get(guildId: string) {
  try {
    await logger.info(`Fetching guild with ID: ${guildId}`);
    console.log(`Fetching guild with ID: ${guildId}`);

    const res = await axios.get(
      `${databaseUrl}.json`,
      {
        params: {
          orderBy: '"id"',
          equalTo: `"${guildId}"`
        }
      }
    );

    const data = res.data;

    const keys = Object.keys(data);
    if (keys.length === 0) {
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

export default get;
