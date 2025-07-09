import express, { Request, Response } from "express";
import { token } from "../config.js";
import logger from "../logging/logger.js";
import startBot from "../client/login.js";
import handleCallback from "../handler/handleCallback.js";
import { redirectUrl, port, host } from "../config.js";
import initializeGuildStore from "../helpers/initializeGuildStore.js";

const app = express(); // Create Express app instance

// Root route redirects to Google (can be changed to your site or landing page)
app.get("/", (_: Request, res: Response) => {
  res.redirect("https://www.google.com/");
});

// OAuth callback route to handle Discord OAuth redirects
app.get("/callback", handleCallback);

// Start server and bot
app.listen(Number(port), host, async () => {
  try {
    // Remove trailing '/callback' from redirectUrl for logging base URL
    const baseRedirect = redirectUrl!.replace(/\/callback$/, "");

    console.log(`Server is running at ${baseRedirect}`);
    await logger.info(`Server is running at ${baseRedirect}`);

    // Initialize in-memory guild store from Firebase before bot login
    await initializeGuildStore();

    // Start the Discord bot using the token from config
    await startBot(token!);
  } catch (error: any) {
    // Log error and exit if startup fails
    console.error("Failed to start bot:", error.message);
    await logger.error("Failed to start bot.");
    await logger.error(error);
    process.exit(1);
  }
});
