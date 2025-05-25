import axios from "axios";

async function fetchUserGuilds(accessToken: string): Promise<any> {
  const response = await axios.get("https://discord.com/api/users/@me/guilds", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return response.data;
}

export default fetchUserGuilds;
