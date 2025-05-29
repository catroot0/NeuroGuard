import { Client, GatewayIntentBits } from "discord.js";
import logger from "../logging/logger.js";
import verifySlashCommands from "../verify/slashCommands.js";
import initializeSlashCommands from "../commands/initializeSlashCommands.js";
import commandHandler from "../slashCommandHandler.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // Intent to access guilds
    GatewayIntentBits.GuildMembers, // Intent to access guild members
    GatewayIntentBits.GuildModeration, // Intent for guild moderation (bans, kicks, etc.)
  ],
});

client.once("ready", async (event) => {
  await logger.info(`${event.user.tag} is Online!`);
  console.log(`${event.user.tag} is Online!`);
  await verifySlashCommands(initializeSlashCommands());
});

client.on("guildDelete", async (guild) => {
  await logger.warn(`Bot got kicked from ${guild.name}, (id: ${guild.id})`);
  console.log(guild);
  console.log(`Bot got kicked from ${guild.name}, (id: ${guild.id})`);
});

client.on("error", async (error) => {
  await logger.error("Unexpected Error Happened!");
  await logger.error(error);
  console.log(`Unexpected Error Happened! | ${error.name}: ${error.message}`);
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    await commandHandler(interaction, interaction.commandName);
  }
});

export default client;
