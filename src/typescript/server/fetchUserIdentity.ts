import axios from "axios";
import logger from "../logging/logger.js";

async function fetchUserIdentity(accessToken: string): Promise<any> {
  console.log("Fetching User Identity.");
  await logger.info("Fetching User Identity.");

  const response = await axios.get("https://discord.com/api/users/@me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  console.log("User Identity Fetched.");
  await logger.info("User Identity Fetched.");

  return response.data;
}

export default fetchUserIdentity;
