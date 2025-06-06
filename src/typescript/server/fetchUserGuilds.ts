import axios from "axios";
import logger from "../logging/logger.js";

// Fetches the list of Discord servers (guilds) the user is in.
async function fetchUserGuilds(accessToken: string): Promise<any> {
  try {
    console.log("Fetching user guild list...");
    await logger.info("Fetching user guild list...");

    const response = await axios.get("https://discord.com/api/users/@me/guilds", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    console.log("User guild list fetched.");
    await logger.info("User guild list fetched.");

    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch user guild list.");
    await logger.error("Failed to fetch user guild list.");
    await logger.error(error);
    throw error;
  }
}

export default fetchUserGuilds;
