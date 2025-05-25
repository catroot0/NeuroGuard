import axios from "axios";

async function fetchAccessToken(clientId: string, clientSecret: string, code: string, redirectUrl: string): Promise<string> {
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

  return response.data.access_token;
}

export default fetchAccessToken;
