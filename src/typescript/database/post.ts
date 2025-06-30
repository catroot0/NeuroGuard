import axios from "axios";
import { databaseUrl } from "../config.js";
import logger from "../logging/logger.js";

export async function post(guildId: string, appealLink: string) {
  const data = { id: guildId, appeal: appealLink };

  try {
    await logger.info(`Posting appeal link for guild: ${guildId}`);
    console.log(`Posting appeal link for guild: ${guildId}`);

    const res = await axios.post(`${databaseUrl}.json`, data);

    await logger.info("Post successful.");
    console.log("Post successful:", res.data);
  } catch (error) {
    await logger.error("Failed to post data.");
    console.error("Failed to post data:", error);
  }
}

export default post;
