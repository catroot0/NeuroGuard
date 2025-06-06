import axios from "axios";
import logger from "../logging/logger.js";

// Fetches an OAuth2 access token from Discord using the provided authorization code.
async function fetchAccessToken(
  clientId: string,
  clientSecret: string,
  code: string,
  redirectUrl: string
): Promise<string> {
  try {
    console.log("Fetching access token...");
    await logger.info("Fetching access token from Discord...");

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

    console.log("Access token fetched successfully.");
    await logger.info("Access token fetched successfully.");
    return response.data.access_token;
  } catch (error: any) {
    console.error("Failed to fetch access token.");
    await logger.error("Failed to fetch access token.");
    await logger.error(error);
    throw error;
  }
}

export default fetchAccessToken;
