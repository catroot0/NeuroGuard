import { token, clientId, clientSecret } from "../config.js";
import isNetworkError from "../helpers/isNetworkError.js";
import logger from "../logging/logger.js";
import client from "./client.js";

if (!token) {
  await logger.error("Bot Token Is Missing!");
  throw new Error("Bot Token Is Missing! Please Check The .env File.");
} else if (!clientId) {
  await logger.error("ClientId Is Missing!");
  throw new Error("Client Id Is Missing! Please Check The .env File.");
} else if (!clientSecret) {
  await logger.error("Client Secret Is Missing!");
  throw new Error("Client Secret Is Missing! Please Check The .env File.");
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
    if (isNetworkError(error)) {
      await logger.error("Login Failed Due To Network Error");
      await logger.error(error);
      console.error("Network-related error detected. Check your internet or Discord API status.");
      process.exit(1);
    } else {
      await logger.error("Login Failed Due To Unexpected Error");
      console.error("Login Failed Due To Unexpected Error! Please Check The Last .log File");
      await logger.error(error);
      process.exit(1);
    }
  }
}

export default startBot;
