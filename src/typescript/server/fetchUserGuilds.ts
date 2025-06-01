import axios from "axios";
import logger from "../logging/logger.js";

async function fetchUserGuilds(accessToken: string): Promise<any> {
  await logger.info("Fetching User GuildList.");
  console.log("Fetching User GuildList.");

  const response = await axios.get("https://discord.com/api/users/@me/guilds", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  await logger.info("User GuildList Fetched.");
  console.log("User GuildList Fetched.");

  return response.data;
}

export default fetchUserGuilds;
