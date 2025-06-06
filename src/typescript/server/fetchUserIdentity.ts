import axios from "axios";
import logger from "../logging/logger.js";

// Fetches basic user identity info from Discord.
async function fetchUserIdentity(accessToken: string): Promise<any> {
  try {
    console.log("Fetching user identity...");
    await logger.info("Fetching user identity...");

    const response = await axios.get("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    console.log("User identity fetched.");
    await logger.info("User identity fetched.");

    return response.data;
  } catch (error) {
    console.error("Failed to fetch user identity.");
    await logger.error("Failed to fetch user identity.");
    await logger.error(error);
  }
}

export default fetchUserIdentity;
