import axios from "axios";
import logger from "../logging/logger.js";
import { databaseUrl } from "../config.js";
import { GuildStore } from "./cache.js";
import { DatabaseData } from "../types.js";

async function remove(match: DatabaseData): Promise<boolean> {
  try {
    // Log the attempt to delete the guild from the database
    await logger.info(`Deleting guild: ${match.id} from database`);
    console.log(`Deleting guild: ${match.id} from database`);

    // Send DELETE request to the database using the guild's firebaseKey
    const res = await axios.delete(`${databaseUrl}/guilds/${match.firebaseKey}.json`);

    // Check if the HTTP status code indicates success
    if (res.status >= 200 && res.status < 300) {
      // Log success and remove the guild from the local cache
      await logger.info("Delete successful.");
      console.log("Delete successful:", res.status);
      GuildStore.delete(match.id);
      return true; // Return true to indicate successful deletion
    } else {
      // Log unexpected HTTP status codes as errors
      await logger.error(`Unexpected status code: ${res.status}`);
      console.error("Unexpected status code:", res.status);
      return false; // Return false to indicate failure
    }
  } catch (error) {
    // Log any error that occurred during the delete request
    await logger.error("Error deleting guild.");
    await logger.error(error);
    console.error("Error deleting guild:", error);
    return false; // Return false on error
  }
}

export default remove;
