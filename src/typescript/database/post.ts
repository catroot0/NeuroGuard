import axios from "axios";
import { databaseUrl } from "../config.js";
import logger from "../logging/logger.js";
import { GuildStore } from "./cache.js";

async function post(
  guildId: string,
  appealLink: string,
  memberRoleId: string,
  verifyChannelId: string
): Promise<boolean> {
  // Prepare the data object to send to the database
  const data = {
    id: guildId,
    appealLink,
    memberRole: memberRoleId,
    verifyChannel: verifyChannelId,
  };

  try {
    // Log the start of the post operation
    await logger.info(`Posting guild data for ID: ${guildId}`);
    console.log(`Posting guild data for ID: ${guildId}`);

    // Send a POST request to the database URL with the guild data
    const res = await axios.post(`${databaseUrl}/guilds.json`, data);

    // Check if the response status indicates success
    if (res.status >= 200 && res.status < 300) {
      // Log success and update the local GuildStore cache
      await logger.info("Post successful.");
      console.log("Post successful:", res.data);
      GuildStore.set(guildId, data);
      return true; // Indicate success
    } else {
      // Log unexpected HTTP status codes
      await logger.error(`Unexpected response status: ${res.status}`);
      console.error("Unexpected response status:", res.status);
      return false; // Indicate failure
    }
  } catch (error) {
    // Log errors from the HTTP request or other failures
    await logger.error("Failed to post guild data");
    await logger.error(error);
    console.error("Failed to post guild data");
    return false; // Indicate failure
  }
}

export default post;
