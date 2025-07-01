import { token, clientId, clientSecret, redirectUrl, databaseUrl } from "../config.js";
import isNetworkError from "../helpers/isNetworkError.js";
import logger from "../logging/logger.js";
import client from "./client.js";

// Configuration validation
if (!token) {
  await logger.error("Bot token is missing. Please check your .env file.");
  throw new Error("Bot token is missing. Check your .env file.");
}

if (!clientId) {
  await logger.error("Client ID is missing. Please check your .env file.");
  throw new Error("Client ID is missing. Check your .env file.");
}

if (!clientSecret) {
  await logger.error("Client secret is missing. Please check your .env file.");
  throw new Error("Client secret is missing. Check your .env file.");
}

if (!redirectUrl) {
  await logger.error("Redirect url is missing. Please check your .env file.");
  throw new Error("Redirect url is missing. Check your .env file.");
}

if (!databaseUrl) {
  await logger.error("Database url is missing. Please check your .env file.");
  throw new Error("Database url is missing. Check your .env file.");
}

await logger.info("Environment variables loaded successfully.");

async function startBot(token: string) {
  try {
    console.log("Logging in to the bot...");
    await logger.info("Attempting to log in to the bot...");

    await client.login(token);

    console.log("Bot login successful.");
    await logger.info("Bot login successful.");
  } catch (error: any) {
    if (isNetworkError(error)) {
      console.error("Login failed due to a network error. Check your internet connection or Discord API status.");
      await logger.error("Login failed: network error.");
    } else {
      console.error("Login failed due to an unexpected error. Please check the latest log file.");
      await logger.error("Login failed: unexpected error.");
    }

    await logger.error(error);
    process.exit(1);
  }
}

export default startBot;
