// Import required environment variables and helper functions
import { token, clientId, clientSecret, redirectUrl, databaseUrl } from "../config.js";
import isNetworkError from "../helpers/isNetworkError.js";
import logger from "../logging/logger.js";
import client from "./client.js";

// === Environment Variable Validation ===

// Check for missing bot token
if (!token) {
  await logger.error("Bot token is missing. Please check your .env file.");
  throw new Error("Bot token is missing. Check your .env file.");
}

// Check for missing client ID
if (!clientId) {
  await logger.error("Client ID is missing. Please check your .env file.");
  throw new Error("Client ID is missing. Check your .env file.");
}

// Check for missing client secret
if (!clientSecret) {
  await logger.error("Client secret is missing. Please check your .env file.");
  throw new Error("Client secret is missing. Check your .env file.");
}

// Check for missing redirect URI
if (!redirectUrl) {
  await logger.error("Redirect url is missing. Please check your .env file.");
  throw new Error("Redirect url is missing. Check your .env file.");
}

// Check for missing database URL
if (!databaseUrl) {
  await logger.error("Database url is missing. Please check your .env file.");
  throw new Error("Database url is missing. Check your .env file.");
}

// Log that all necessary env variables are present
await logger.info("Environment variables loaded successfully.");

// === Function to Start and Log in the Bot ===
async function startBot(token: string) {
  try {
    // Log attempt to start the bot
    console.log("Logging in to the bot...");
    await logger.info("Attempting to log in to the bot...");

    // Log in to Discord using the bot token
    await client.login(token);

    // Log successful login
    console.log("Bot login successful.");
    await logger.info("Bot login successful.");
  } catch (error: any) {
    // Handle network-specific errors
    if (isNetworkError(error)) {
      console.error("Login failed due to a network error. Check your internet connection or Discord API status.");
      await logger.error("Login failed: network error.");
    } else {
      // Handle any other unexpected errors
      console.error("Login failed due to an unexpected error. Please check the latest log file.");
      await logger.error("Login failed: unexpected error.");
    }

    // Log the raw error for debugging
    await logger.error(error);

    // Exit the process with failure code
    process.exit(1);
  }
}

// Export the function so it can be called from other modules (e.g., an entry point)
export default startBot;
