function createOAuthURL(clientId: string, redirectUrl: string): string {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUrl,
    response_type: "code",
    scope: "identify guilds",
    prompt: "consent",
  });

  return `https://discord.com/oauth2/authorize?${params.toString()}`;
}

export default createOAuthURL;
