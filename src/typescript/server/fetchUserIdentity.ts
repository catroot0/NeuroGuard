import axios from "axios";

async function fetchUserIdentity(accessToken: string): Promise<any> {
  const response = await axios.get("https://discord.com/api/users/@me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return response.data;
}

export default fetchUserIdentity;
