import { clientId, redirectUrl, clientSecret } from "../config.js";
import { Request, Response } from "express";
import fetchAccessToken from "../server/fetchAccessToken.js";
import logger from "../logging/logger.js";
import checkForNsfwGuild from "../search/nsfwGuild.js";
import ban from "../actions/ban.js";
import getUserData from "../helpers/getUserData.js";

async function handleCallback(req: Request, res: Response) {
  console.log("-------------------------------------------");
  await logger.info("OAuth callback received.");

  const code = req.query.code as string;
  const state = req.query.state as string;

  if (!code || !state) {
    res.status(400).send("Missing 'code' or 'state' in query.");
    return;
  }

  let guildId: string;

  try {
    guildId = JSON.parse(state).guildId;
  } catch {
    res.status(400).send("Invalid state parameter.");
    return;
  }

  // Send immediate response
  res.send(`
    <html>
      <head>
        <title>You're Good To Go</title>
        <style>
          body { background-color: #000; color: #fff; font-family: sans-serif; text-align: center; padding-top: 50px; }
          a { color: #aaa; text-decoration: none; }
          a:hover { color: #aff999; }
        </style>
      </head>
      <body>
        <h1>You may now close this page.</h1>
        <p hidden><a href="https://discord.com/users/1346355816281800704" target="_blank">Bee is a good girl (im proud of her)</a></p>
        </body>
        </html>
        `);
        
  try {
    const accessToken = await fetchAccessToken(clientId!, clientSecret!, code, redirectUrl!);
    const { guilds, identity} = (await getUserData(accessToken)) || {};

    if(!guilds || !identity) {
      await logger.error("Missing userGuilds or identity, returning.");
      console.log("Missing userGuilds or identity, returning.");
      return;
    }
    
    const [hasNsfwGuild, nsfwGuilds] = await checkForNsfwGuild(guilds);

    if (hasNsfwGuild) {
      await ban(identity.id, guildId, nsfwGuilds, "Being in an NSFW (porn/condo) server");
    } else {
      await logger.info(`User ${identity.username} (${identity.id}) is not in any NSFW server.`);
      console.log(`User ${identity.username} (${identity.id}) is not in any NSFW server.`);
    }
  } catch (err: any) {
    console.error("Error during callback processing:", err.response?.data || err.message);
    await logger.error("Callback processing failed.");
    await logger.error(err);
  }
}

export default handleCallback;
