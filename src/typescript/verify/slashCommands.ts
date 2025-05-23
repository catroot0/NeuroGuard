import { Routes, REST, RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import { config } from "dotenv";
import logger from "../logging/logger.js";
config();

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);

// bruh wtf is RESTPostAPIChatInputApplicationCommandsJSONBody :|
async function verifySlashCommands(commands: RESTPostAPIChatInputApplicationCommandsJSONBody[]) {
  try {
    console.log("---------------------------------");
    await logger.info("Registering Slash Commands...");
    console.log("Registering Slash Commands...");

    // prettier-ignore
    await rest.put(
      Routes.applicationCommands(process.env.ClientId!),
      { body: commands }
    );
    await logger.info("Slash Commands Registered Successfully!");
    console.log("Slash Commands Registered Successfully!");
  } catch (error) {
    await logger.error("Registering Slash Commands Failed!");
    console.error("Registering Slash Commands Failed!");
    await logger.error(error);
    process.exit(1);
  }
}

export default verifySlashCommands;
