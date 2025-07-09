/**
 * Creates a Discord OAuth2 authorization URL.
 *
 * @param clientId - Your Discord application's client ID.
 * @param redirectUrl - The URL Discord will redirect to after authorization.
 * @param guildId - Optional guild ID to include in the state parameter for later use.
 * @returns The full OAuth2 authorization URL string.
 */
function createOAuthURL(clientId: string, redirectUrl: string, guildId?: string): string {
  // Initialize URLSearchParams with required OAuth2 parameters
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUrl,
    response_type: "code",          // Request authorization code
    scope: "identify guilds",       // Request permissions to identify user and get their guilds
    prompt: "consent",              // Force consent screen to always show
  });

  // If guildId is provided, add it to the state param as a JSON string
  if (guildId) {
    params.append("state", JSON.stringify({ guildId }));
  }

  // Construct and return the full OAuth2 authorization URL
  return `https://discord.com/oauth2/authorize?${params.toString()}`;
}

export default createOAuthURL;
