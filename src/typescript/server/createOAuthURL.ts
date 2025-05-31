function createOAuthURL(clientId: string, redirectUrl: string, guildId?: string): string {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUrl,
    response_type: "code",
    scope: "identify guilds",
    prompt: "consent",
  });

  if (guildId) {
    params.append("state", JSON.stringify({ guildId }));
  }

  return `https://discord.com/oauth2/authorize?${params.toString()}`;
}

export default createOAuthURL;
