import { config } from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import logger from "./logging/logger.js";
config();

const token = process.env.TOKEN;

// if there is no bot token, then tell the user to check the .env file...
// honestly i don't know how can someone be stupid enough to try using a bot without a token :|
if (!token) {
  await logger.info("Bot Token Is Missing!");
  throw new Error("Bot Token Is Missing! Please Check The .env File.");
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, // Intent to access guilds
    GatewayIntentBits.GuildMembers, // Intent to access guild members
    GatewayIntentBits.GuildModeration, // Intent for guild moderation (bans, kicks, etc.)
  ],
});

async function login(token: string) {
  try {
    console.log("Logging In...");
    await logger.info("Logging In...");
    await client.login(token);
    await logger.info("Login Successful!");
    console.log("Login Successful!");
  } catch (error: any) {
    await logger.error("Login failed!");
    await logger.error(error.stack || error.message || error);

    if (error.syscall === "connect") {
      console.error("Network error! Please check your internet connection.");
    } else if (error.name === "ConnectTimeoutError") {
      console.error("Network error! Please check your internet connection.");
    } else {
      console.error("An unexpected error occurred. Restart the bot.");
    }
  }
}

client.once("ready", async (event) => {
  await logger.info(`${event.user.tag} is Online!`);
  console.log(`${event.user.tag} is Online!`);
});

client.on("guildDelete", async (guild) => {
  await logger.warn(`Bot got kicked from ${guild.name}, (id: ${guild.id})`);
  console.log(guild);
  console.log(`Bot got kicked from ${guild.name}, (id: ${guild.id})`);
});

await login(token);
