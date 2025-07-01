import axios from "axios";
import { databaseUrl } from "../config.js";
import logger from "../logging/logger.js";

async function post(guildId: string, appealLink: string, memberRoleId: string, verifyChannelId: string): Promise<boolean> {
  const data = { serverId: guildId, appealServer: appealLink, memberRole: memberRoleId, verifyChannel: verifyChannelId };

  try {
    await logger.info(`Posting appeal link for guild: ${guildId}`);
    console.log(`Posting appeal link for guild: ${guildId}`);

    const res = await axios.post(`${databaseUrl}.json`, data);

    if (res.status >= 200 && res.status < 300) {
      await logger.info("Post successful.");
      console.log("Post successful:", res.data);

      return true;
    } else {
      await logger.error(`Unexpected status code: ${res.status}`);
      console.error("Unexpected status code:", res.status);
      
      return false;
    }

  } catch (error) {
    await logger.error("Failed to post data.");
    console.error("Failed to post data:", error);
    return false;
  }
}

export default post;
