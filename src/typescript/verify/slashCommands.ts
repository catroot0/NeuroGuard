import { token, clientId } from "../config.js";
import { Routes, REST, RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import logger from "../logging/logger.js";
import normalizeSlashCommands from "../normalize/slashCommands.js";
import isEqual from "lodash.isequal";

const rest = new REST({ version: "10" }).setToken(token!);

// bruh wtf is RESTPostAPIChatInputApplicationCommandsJSONBody :|
async function verifySlashCommands(commands: RESTPostAPIChatInputApplicationCommandsJSONBody[]) {
  try {
    console.log("---------------------------------");
    console.log("Checking If Slash Commands Are Up To Date...");
    await logger.info("Checking If Slash Commands Are Up To Date...");

    // the code talks for itself :3
    const existingCommands = (await rest.get(Routes.applicationCommands(clientId!))) as RESTPostAPIChatInputApplicationCommandsJSONBody[];
    const normalizedCommands = normalizeSlashCommands(commands);
    const normalizedExistingCommands = normalizeSlashCommands(existingCommands);

    if (isEqual(normalizedCommands, normalizedExistingCommands)) {
      await logger.info("Slash Commands Are Up To Date!");
      console.log("Slash Commands Are Up To Date!");
    } else {
      await logger.info("Slash Commands Are NOT Up To Date!");
      console.log("Slash Commands Are NOT Up To Date!");
      await logger.info("Registering Slash Commands...");
      console.log("Registering Slash Commands...");

      await rest.put(
      Routes.applicationCommands(process.env.ClientId!),
      { body: commands }
    );
      await logger.info("Slash Commands Registered Successfully!");
      console.log("Slash Commands Registered Successfully!");
    }
  } catch (error) {
    await logger.error("Registering Slash Commands Failed!");
    console.error("Registering Slash Commands Failed!");
    await logger.error(error);
    process.exit(1);
  }
}

export default verifySlashCommands;
