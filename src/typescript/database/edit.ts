import axios from "axios";
import logger from "../logging/logger.js";
import get from "./get.js";
import { databaseUrl } from "../config.js";

async function edit(guildId: string, newAppealLink: string) {
  const match = await get(guildId);
  if (!match) {
    await logger.info("Guild not found in database. Cannot be updated.");
    console.log("Guild not found in database. Cannot be updated.");
    return;
  }

  const updatedData = { ...match.data, appealLink: newAppealLink };

  try {
    await logger.info(`Updating guild: ${guildId}`);
    console.log(`Updating guild: ${guildId}`);

    await axios.put(`${databaseUrl}/${match.key}.json`, updatedData);

    await logger.info("Update successful.");
    console.log("Update successful.");
  } catch (error) {
    await logger.error("Error updating guild.");
    await logger.error(error);
    console.error("Error updating guild");
  }
}

export default edit;
