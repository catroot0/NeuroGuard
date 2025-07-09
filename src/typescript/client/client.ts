// Import necessary modules and handlers
import { Client, GatewayIntentBits } from "discord.js";
import logger from "../logging/logger.js";
import verifySlashCommands from "../verify/slashCommands.js";
import initializeSlashCommands from "../commands/initializeSlashCommands.js";
import commandHandler from "../handler/slashCommandHandler.js";
import buttonHandler from "../handler/buttonHandler.js";

// Create a new Discord client instance with required gateway intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,              // Allows the bot to receive events related to servers (guilds)
    GatewayIntentBits.GuildMembers,        // Allows the bot to fetch and track members in guilds
    GatewayIntentBits.GuildModeration,     // Enables actions like banning/kicking members
  ],
});

// Runs once when the bot is successfully logged in and ready
client.once("ready", async (event) => {
  // Log that the bot is online (both in logger and console)
  await logger.info(`${event.user.tag} is Online!`);
  console.log(`${event.user.tag} is Online!`);

  // Register or update slash commands for all guilds
  await verifySlashCommands(initializeSlashCommands());
});

// Triggered when the bot is removed from a guild
client.on("guildDelete", async (guild) => {
  // Log the guild the bot was removed from
  await logger.warn(`Bot got kicked from ${guild.name}, (id: ${guild.id})`);
  console.log(`Bot got kicked from ${guild.name}, (id: ${guild.id})`);
});

// Handle any errors that occur at the client level
client.on("error", async (error: any) => {
  // Handle a specific error code (10062 = unknown interaction)
  if (error.code === 10062) {
    console.warn("Unknown interaction error... Possibly due to network lag or slow response");
    await logger.error("Unknown interaction error... Possibly due to network lag or slow response");
    return;
  }

  // Log unexpected errors
  console.log(`Unexpected error happened! | ${error.name}: ${error.message}`);
});

// Handle all types of interactions: slash commands and button presses
client.on("interactionCreate", async (interaction) => {
  // If the interaction is a slash command
  if (interaction.isChatInputCommand()) {
    await commandHandler(interaction, interaction.commandName);
  }
  // If the interaction is a button click
  else if (interaction.isButton()) {
    await buttonHandler(interaction, interaction.customId);
  }
});

// Export the client instance for use elsewhere in the project
export default client;
