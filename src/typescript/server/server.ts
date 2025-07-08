import express, { Request, Response } from "express";
import { token } from "../config.js";
import logger from "../logging/logger.js";
import startBot from "../client/login.js";
import handleCallback from "../handler/handleCallback.js";
import { redirectUrl, port, host } from "../config.js";

const app = express();

app.get("/", (_: Request, res: Response) => {
  res.redirect("https://www.google.com/");
});

app.get("/callback", handleCallback);

app.listen(Number(port), host, async () => {
  try {
    const baseRedirect = redirectUrl!.replace(/\/callback$/, ""); 
 
    console.log(`Server is running at ${baseRedirect}`); 
    await logger.info(`Server is running at ${baseRedirect}`); 
 
    await startBot(token!);
  } catch (error: any) {
    console.error("Failed to start bot:", error.message);
    await logger.error("Failed to start bot.");
    await logger.error(error);
    process.exit(1);
  }
});
