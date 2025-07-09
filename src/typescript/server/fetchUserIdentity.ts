import axios from "axios";
import logger from "../logging/logger.js";

/**
 * Fetches basic user identity information from Discord.
 *
 * @param accessToken - OAuth2 access token for the user
 * @returns A Promise resolving to the user's identity data (or undefined if failed)
 */
async function fetchUserIdentity(accessToken: string): Promise<any> {
  try {
    console.log("Fetching user identity...");
    await logger.info("Fetching user identity...");

    // Send GET request to Discord API to fetch the current user's identity info
    const response = await axios.get("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${accessToken}` }, // Bearer token for authentication
    });

    console.log("User identity fetched.");
    await logger.info("User identity fetched.");

    // Return the user's identity data from the response
    return response.data;
  } catch (error) {
    // Log any errors encountered while fetching user identity
    console.error("Failed to fetch user identity.");
    await logger.error("Failed to fetch user identity.");
    await logger.error(error);
    // Note: no explicit throw, so undefined will be returned on error
  }
}

export default fetchUserIdentity;
