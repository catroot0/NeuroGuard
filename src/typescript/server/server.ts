import { clientId, redirectUrl, clientSecret } from "../config.js";
import express, { Request, Response } from "express";
import createOAuthURL from "./createOAuthURL.js";
import fetchAccessToken from "./fetchAccessToken.js";
import fetchUserGuilds from "./fetchUserGuilds.js";
import normalizeUserGuilds from "./normalizeUserGuilds.js";

const app = express();
const PORT = 3000;

const AuthURL = createOAuthURL(clientId!, redirectUrl!);

function redirectToAuth(_: Request, res: Response) {
  res.redirect(AuthURL);
}

async function handleCallback(req: Request, res: Response) {
  const code = req.query.code as string;
  try {
    const accessToken = await fetchAccessToken(clientId!, clientSecret!, code, redirectUrl!);
    const guilds = await fetchUserGuilds(accessToken);
    console.log(normalizeUserGuilds(guilds));
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
