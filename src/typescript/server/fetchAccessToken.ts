import axios from "axios";
import logger from "../logging/logger.js";

/**
 * Fetches an OAuth2 access token from Discord using the provided authorization code.
 *
 * @param clientId - The Discord application's client ID.
 * @param clientSecret - The Discord application's client secret.
 * @param code - The authorization code received from the OAuth2 callback.
 * @param redirectUrl - The redirect URI used in the OAuth2 flow.
 * @returns A Promise that resolves to the access token string.
 */
async function fetchAccessToken(
  clientId: string,
  clientSecret: string,
  code: string,
  redirectUrl: string
): Promise<string> {
  try {
    console.log("Fetching access token...");
    await logger.info("Fetching access token from Discord...");

    // Make POST request to Discord's OAuth2 token endpoint
    const response = await axios.post(
      "https://discord.com/api/oauth2/token",
      // Send data as URL-encoded form
      new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code", // OAuth2 grant type
        code,                             // Authorization code
        redirect_uri: redirectUrl,        // Redirect URL
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    console.log("Access token fetched successfully.");
    await logger.info("Access token fetched successfully.");

    // Return the access token from the response
    return response.data.access_token;
  } catch (error: any) {
    // Log errors in case the request fails
    console.error("Failed to fetch access token.");
    await logger.error("Failed to fetch access token.");
    await logger.error(error);
    // Propagate the error to the caller
    throw error;
  }
}

export default fetchAccessToken;
