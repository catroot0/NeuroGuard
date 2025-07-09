import { clientId, redirectUrl, clientSecret } from "../config.js";
import { Request, Response } from "express";
import fetchAccessToken from "../server/fetchAccessToken.js";
import logger from "../logging/logger.js";
import checkForNsfwGuild from "../search/nsfwGuild.js";
import ban from "../actions/ban.js";
import getUserData from "../helpers/getUserData.js";
import giveMemberRole from "../actions/giveMemberRole.js";
import { GuildStore } from "../database/cache.js";

async function handleCallback(req: Request, res: Response) {
  // Log the start of the callback processing
  console.log("-------------------------------------------");
  await logger.info("OAuth callback received.");

  // Extract 'code' and 'state' query parameters from the request
  const code = req.query.code as string;
  const state = req.query.state as string;

  // Validate presence of 'code' and 'state'
  if (!code || !state) {
    res.status(400).send("Missing 'code' or 'state' in query.");
    return;
  }

  let guildId: string;

  // Parse 'state' to extract guildId, return error if invalid JSON
  try {
    guildId = JSON.parse(state).guildId;
  } catch {
    res.status(400).send("Invalid state parameter.");
    return;
  }

  // Send immediate HTML response to user, allowing them to close the page
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
    // Fetch Discord OAuth access token using provided code and app credentials
    const accessToken = await fetchAccessToken(clientId!, clientSecret!, code, redirectUrl!);

    // Fetch user guilds and identity info using the access token
    const { guilds, identity } = (await getUserData(accessToken)) || {};

    // Verify the user data is present
    if (!guilds || !identity) {
      await logger.error("Missing userGuilds or identity, returning.");
      console.log("Missing userGuilds or identity, returning.");
      return;
    }

    // Check if user is a member of any NSFW guilds
    const [hasNsfwGuild, nsfwGuilds] = await checkForNsfwGuild(guilds);

    if (hasNsfwGuild) {
      // Ban user if they are part of any NSFW guilds
      await ban(identity.id, guildId, nsfwGuilds, "Being in an NSFW (porn/condo) server");
    } else {
      // Log success and give the member role in the guild
      await logger.info(`User ${identity.username} (${identity.id}) is not in any NSFW server.`);
      console.log(`User ${identity.username} (${identity.id}) is not in any NSFW server.`);
      
      // Retrieve guild data from cache
      const guildData = GuildStore.getById(guildId);

      // Safety check to ensure guild data exists before proceeding
      if (!guildData) {
        await logger.error(`Guild data for ID ${guildId} not found in cache.`);
        console.error(`Guild data for ID ${guildId} not found in cache.`);
        return;
      }

      // Assign member role to the user in the guild
      await giveMemberRole(guildData.id, identity.id);
    }
  } catch (err: any) {
    // Handle and log errors during processing
    console.error("Error during callback processing:", err.response?.data || err.message);
    await logger.error("Callback processing failed.");
    await logger.error(err);
  }
}

export default handleCallback;
