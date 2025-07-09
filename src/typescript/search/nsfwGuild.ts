import { NormalizedGuild } from "../interface.js";
import logger from "../logging/logger.js";
import fs from "fs";

// Read the list of NSFW guild IDs from a JSON file on disk
const rawNsfwGuildIds = fs.readFileSync("src/nsfwGuildIds.json", "utf-8");
// Parse the JSON string into an array of strings (guild IDs)
const nsfwGuildIds: string[] = JSON.parse(rawNsfwGuildIds);

/**
 * Checks if the user is a member of any NSFW guilds.
 * 
 * @param userGuilds - Array of normalized guild objects the user is part of.
 * @returns A tuple where the first element is a boolean indicating presence in any NSFW guild,
 *          and the second is an array of the NSFW guilds the user is in.
 */
async function checkForNsfwGuild(userGuilds: NormalizedGuild[]): Promise<[boolean, NormalizedGuild[]]> {
  const nsfwGuilds: NormalizedGuild[] = [];

  // Iterate over each guild the user belongs to
  for (const guild of userGuilds) {
    // If the guild ID is in the NSFW guild IDs list
    if (nsfwGuildIds.includes(guild.id)) {
      // Add to NSFW guilds array
      nsfwGuilds.push(guild);
      // Log info about the NSFW guild membership
      await logger.info(`User is in ${guild.name} (NSFW) - banning!`);
    }
  }

  // Return true if any NSFW guilds found, along with the list of those guilds
  return [nsfwGuilds.length > 0, nsfwGuilds];
}

export default checkForNsfwGuild;
