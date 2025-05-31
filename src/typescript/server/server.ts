import { token } from "../config.js";
import express, { Request, Response } from "express";
import logger from "../logging/logger.js";
import startBot from "../client/login.js";
import handleCallback from "./handleCallback.js";
handleCallback;

const app = express();
const PORT = 3000;

async function redirectToGoogle(_: Request, res: Response) {
  res.redirect("https://www.google.com/");
}

app.get("/", redirectToGoogle);
app.get("/callback", handleCallback);

app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  await logger.info(`Server is running at http://localhost:${PORT}`);
  await startBot(token!);
});
