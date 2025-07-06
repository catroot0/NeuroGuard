import express, { Request, Response } from "express";
import { token } from "../config.js";
import logger from "../logging/logger.js";
import startBot from "../client/login.js";
import handleCallback from "../handler/handleCallback.js";
import { redirectUrl } from "../config.js";

const app = express();
const PORT = 3000;

app.get("/", (_: Request, res: Response) => {
  res.redirect("https://www.google.com/");
});

app.get("/callback", handleCallback);

app.listen(PORT, async () => {
  try {
    console.log(`Server is running at ${redirectUrl!.replace(/\/callback$/, "")}`);
    await logger.info(`Server is running at ${redirectUrl!.replace(/\/callback$/, "")}`);

    await startBot(token!);
  } catch (err: any) {
    console.error("Failed to start bot:", err.message);
    await logger.error("Failed to start bot.");
    await logger.error(err);
    process.exit(1);
  }
});
