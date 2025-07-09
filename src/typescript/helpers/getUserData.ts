import { User } from "discord.js";
import fetchUserGuilds from "../server/fetchUserGuilds.js";
import fetchUserIdentity from "../server/fetchUserIdentity.js";
import normalizeUserGuilds from "../server/normalizeUserGuilds.js";
import { UserData } from "../interface.js";

/**
 * Retrieves and normalizes user data from Discord API using an access token.
 * @param accessToken - OAuth2 access token for the user
 * @returns A UserData object containing normalized guilds and user identity, or null on failure.
 */
async function getUserData(accessToken: string): Promise<UserData | null> {
  try {
    // Fetch raw list of guilds the user belongs to
    const rawGuilds = await fetchUserGuilds(accessToken);

    // Fetch user's identity info (username, id, etc.)
    const user: User = await fetchUserIdentity(accessToken);

    // Normalize guilds to a common format used throughout the app
    const normalizedGuilds = normalizeUserGuilds(rawGuilds);

    // Return both normalized guilds and user identity
    return {
      guilds: normalizedGuilds,
      identity: user,
    };
  } catch (err) {
    // Log error and return null if anything goes wrong
    console.error("Failed to get user data:", err);
    return null;
  }
}

export default getUserData;
