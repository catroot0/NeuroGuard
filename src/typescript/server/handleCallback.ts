import { clientId, redirectUrl, clientSecret } from "../config.js";
import { Request, Response } from "express";
import fetchAccessToken from "./fetchAccessToken.js";
import fetchUserGuilds from "./fetchUserGuilds.js";
import normalizeUserGuilds from "../normalize/userGuild.js";
import fetchUserIdentity from "./fetchUserIdentity.js";
import logger from "../logging/logger.js";
import checkForNsfwGuild from "../search/nsfwGuild.js";
import ban from "../actions/ban.js";

async function handleCallback(req: Request, res: Response) {
  console.log("-------------------------------------------");
  const code = req.query.code as string;
  const state = req.query.state as string;

  const guildId = JSON.parse(state).guildId;

  await logger.info("OAuth Callback Received.");
  console.log("OAuth Callback Received.");
  try {
    res.send(`
      <html>
       <title>Im Useless :)</title>
       <style>
       body{background-color: #000}
       h1{color: #fff}
       .a{color: #000 !important}
       .a::selection{background-color: #ff0000}
       </style>
        <body>
          <h1>You May Close This Page Now!</h1>
          <h1 class="a">Well Done, You Found An Useless Easter Egg</h1>
        </body>
      </html>
    `);

    const accessToken = await fetchAccessToken(clientId!, clientSecret!, code, redirectUrl!);
    const guilds = await fetchUserGuilds(accessToken);
    const identity = await fetchUserIdentity(accessToken);
    const normalizedGuilds = normalizeUserGuilds(guilds);
    const shouldBan = await checkForNsfwGuild(normalizedGuilds);

    if (shouldBan[0]) {
      await ban(identity.id, guildId, shouldBan[1], "Being In A NSFW Server");
    }
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    res.status(500).send("An error occurred");
  }
}

export default handleCallback;
