import axios from "axios";
import logger from "../logging/logger.js";
import { databaseUrl } from "../config.js";
import { GuildResponse } from "../interface.js";
import { GuildStore } from "./cache.js";
import { DatabaseData } from "../types.js";

async function remove(match: DatabaseData): Promise<boolean> {
  try {
    await logger.info(`Deleting guild: ${match.id} from database`);
    console.log(`Deleting guild: ${match.id} from database`);

    const res = await axios.delete(`${databaseUrl}/guilds/${match.firebaseKey}.json`);

    if (res.status >= 200 && res.status < 300) {
      await logger.info("Delete successful.");
      console.log("Delete successful:", res.status);
      GuildStore.delete(match.id);
      return true;
    } else {
      await logger.error(`Unexpected status code: ${res.status}`);
      console.error("Unexpected status code:", res.status);
      return false;
    }
  } catch (error) {
    await logger.error("Error deleting guild.");
    await logger.error(error);
    console.error("Error deleting guild:", error);
    return false;
  }
}

export default remove;
