import { User } from "discord.js";
import fetchUserGuilds from "../server/fetchUserGuilds.js";
import fetchUserIdentity from "../server/fetchUserIdentity.js";
import normalizeUserGuilds from "../server/normalizeUserGuilds.js";
import { UserData } from "../interface.js";

async function getUserData(accessToken: string): Promise<UserData | null> {
  try {
    const rawGuilds = await fetchUserGuilds(accessToken);
    const user: User = await fetchUserIdentity(accessToken);
    const normalizedGuilds = normalizeUserGuilds(rawGuilds);

    return {
      guilds: normalizedGuilds,
      identity: user,
    };
  } catch (err) {
    console.error("Failed to get user data:", err);
    return null;
  }
}

export default getUserData