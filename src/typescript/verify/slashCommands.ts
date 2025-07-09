import { token, clientId } from "../config.js";
import { Routes, REST, RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import logger from "../logging/logger.js";
import normalizeSlashCommands from "../normalize/slashCommands.js";
import isEqual from "lodash.isequal";

const rest = new REST({ version: "10" }).setToken(token!); // Create REST client with bot token

// Function to verify and update slash commands if needed
async function verifySlashCommands(commands: RESTPostAPIChatInputApplicationCommandsJSONBody[]) {
  try {
    console.log("---------------------------------");
    console.log("Checking if slash commands are up to date...");
    await logger.info("Checking if slash commands are up to date...");

    // Fetch existing global application commands from Discord API
    const existingCommands = await rest.get(
      Routes.applicationCommands(clientId!)
    ) as RESTPostAPIChatInputApplicationCommandsJSONBody[];

    // Normalize the new commands and the existing commands for consistent comparison
    const normalizedNew = normalizeSlashCommands(commands);
    const normalizedExisting = normalizeSlashCommands(existingCommands);

    // Compare normalized commands; if equal, no update needed
    if (isEqual(normalizedNew, normalizedExisting)) {
      console.log("Slash commands are up to date.");
      await logger.info("Slash commands are up to date.");
    } else {
      // Commands differ, so update (register) the slash commands
      console.log("Slash commands are not up to date. Registering...");
      await logger.info("Slash commands are not up to date. Registering...");

      await rest.put(
        Routes.applicationCommands(clientId!), // API endpoint to overwrite global commands
        { body: commands } // The new commands to register
      );

      console.log("Slash commands registered successfully!");
      await logger.info("Slash commands registered successfully.");
    }
  } catch (error) {
    // Log and exit on error
    console.error("Registering slash commands failed!");
    await logger.error("Registering slash commands failed.");
    await logger.error(error);
    process.exit(1);
  }
}

export default verifySlashCommands;
