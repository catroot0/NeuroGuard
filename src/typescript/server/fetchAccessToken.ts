import axios from "axios";
import logger from "../logging/logger.js";

async function fetchAccessToken(clientId: string, clientSecret: string, code: string, redirectUrl: string): Promise<string> {
  console.log("Fetching Access Token.");
  await logger.info("Fetching Access Token.");
  const response = await axios.post(
    "https://discord.com/api/oauth2/token",
    new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUrl,
    }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );
  console.log("Accept Token Fetched Successfully");
  await logger.info("Access Token Fetched Successfully.");
  return response.data.access_token;
}

export default fetchAccessToken;
