import axios from "axios";
import { databaseUrl } from "../config.js";
import logger from "../logging/logger.js";

async function post(
  guildId: string,
  appealLink: string,
  memberRoleId: string,
  verifyChannelId: string
): Promise<boolean> {
  const data = {
    id: guildId,
    appealLink,
    memberRole: memberRoleId,
    verifyChannel: verifyChannelId,
  };

  try {
    await logger.info(`Posting guild data for ID: ${guildId}`);
    console.log(`Posting guild data for ID: ${guildId}`);

    const res = await axios.post(`${databaseUrl}/guilds.json`, data);

    if (res.status >= 200 && res.status < 300) {
      await logger.info("Post successful.");
      console.log("Post successful:", res.data);
      return true;
    } else {
      await logger.error(`Unexpected response status: ${res.status}`);
      console.error("Unexpected response status:", res.status);
      return false;
    }
  } catch (error) {
    await logger.error("Failed to post guild data");
    await logger.error(error);
    console.error("Failed to post guild data");
    return false;
  }
}

export default post;
