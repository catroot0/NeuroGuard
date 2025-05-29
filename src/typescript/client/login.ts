import { token, clientId } from "../config.js";
import logger from "../logging/logger.js";
import client from "./client.js";

if (!token) {
  await logger.error("Bot Token Is Missing!");
  throw new Error("Bot Token Is Missing! Please Check The .env File.");
} else if (!clientId) {
  await logger.error("ClientId Is Missing!");
  throw new Error("Client Id Is Missing! Please Check The .env File.");
} else {
  await logger.info("Both Bot Token And Client Id Are There!");
}

async function startBot(token: string) {
  try {
    console.log("Logging In To The Bot...");
    await logger.info("Logging In To The Bot...");
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

export default startBot;
