import axios from "axios";
import logger from "../logging/logger.js";
import get from "./get.js";
import { databaseUrl } from "../config.js";

async function remove(guildId: string) {
  const match = await get(guildId);
  if (!match) {
    await logger.info("Guild not found in database, cannot be deleted.");
    console.log("Guild not found in database, cannot delete be deleted.");
    return;
  }

  try {
    await logger.info(`Deleting guild: ${guildId} from database`);
    console.log(`Deleting guild: ${guildId} from database`);

    await axios.delete(`${databaseUrl}/${match.key}.json`);

    await logger.info("Delete successful.");
    console.log("Delete successful.");
  } catch (error) {
    await logger.error("Error deleting guild.");
    console.error("Error deleting guild:", error);
  }
}

export default remove