import { clientId, redirectUrl, clientSecret } from "../config.js";
import express, { Request, Response } from "express";
import createOAuthURL from "./createOAuthURL.js";
import fetchAccessToken from "./fetchAccessToken.js";
import fetchUserGuilds from "./fetchUserGuilds.js";
import normalizeUserGuilds from "./normalizeUserGuilds.js";
import fetchUserIdentity from "./fetchUserIdentity.js";
import logger from "../logging/logger.js";

const app = express();
const PORT = 3000;

const AuthURL = createOAuthURL(clientId!, redirectUrl!);

async function redirectToAuth(_: Request, res: Response) {
  try {
    console.log("Redirecting User To Auth URL...");
    await logger.info(`Redirecting User To Auth URL (${AuthURL})`);

    res.redirect(AuthURL);

    console.log("User Redirected Successfully!");
    await logger.info(`User Redirected To URL ${AuthURL} Successfully`);
  } catch (error) {
    console.log("Redirection Failed...", error);
    await logger.error(`Redirecting User To ${AuthURL} Failed! | ${error}`);
  }
}

async function handleCallback(req: Request, res: Response) {
  const code = req.query.code as string;
  await logger.info("OAuth Callback Received.");
  console.log("OAuth Callback Received.");
  try {
    console.log("Fetching Access Token.");
    await logger.info("Fetching Access Token.");

    const accessToken = await fetchAccessToken(clientId!, clientSecret!, code, redirectUrl!);

    console.log("Accept Token Fetched Successfully");
    await logger.info("Access Token Fetched Successfully.");

    await logger.info("Fetching User GuildList.");
    console.log("Fetching User GuildList.");

    const guilds = await fetchUserGuilds(accessToken);

    await logger.info("User GuildList Fetched.");
    console.log("User GuildList Fetched.");

    console.log("Fetching User Identity.");
    await logger.info("Fetching User Identity.");

    const identity = await fetchUserIdentity(accessToken);

    console.log("User Identity Fetched.");
    await logger.info("User Identity Fetched.");

    res.send(`
      <html>
       <title>Im Useless :)</title>
        <body>
          <h1>You May Close This Page Now!</h1>
        </body>
      </html>
    `);
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    res.status(500).send("An error occurred");
  }
}

app.get("/", redirectToAuth);
app.get("/callback", handleCallback);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
