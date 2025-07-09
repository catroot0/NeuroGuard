import axios from "axios";
import logger from "../logging/logger.js";

/**
 * Fetches the list of Discord servers (guilds) the user is a member of.
 *
 * @param accessToken - OAuth2 access token for the user
 * @returns A Promise resolving to the user's guild list data
 */
async function fetchUserGuilds(accessToken: string): Promise<any> {
  try {
    console.log("Fetching user guild list...");
    await logger.info("Fetching user guild list...");

    // Send GET request to Discord API to fetch user's guilds
    const response = await axios.get("https://discord.com/api/users/@me/guilds", {
      headers: { Authorization: `Bearer ${accessToken}` }, // Bearer token for authentication
    });

    console.log("User guild list fetched.");
    await logger.info("User guild list fetched.");

    // Return the list of guilds from the response data
    return response.data;
  } catch (error: any) {
    // Log any errors encountered while fetching guilds
    console.error("Failed to fetch user guild list.");
    await logger.error("Failed to fetch user guild list.");
    await logger.error(error);
    // Throw the error so the caller can handle it
    throw error;
  }
}

export default fetchUserGuilds;
