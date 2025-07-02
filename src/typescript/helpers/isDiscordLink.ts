function isDiscordLink(link: string): boolean {
  const normalized = link.trim().toLowerCase();

  const discordPatterns = [
    /^https?:\/\/(www\.)?discord\.gg\/[a-z0-9]+$/,
    /^https?:\/\/(www\.)?discord\.com\/invite\/[a-z0-9]+$/,
    /^https?:\/\/(www\.)?discordapp\.com\/invite\/[a-z0-9]+$/,
    /^(www\.)?discord\.gg\/[a-z0-9]+$/,
    /^discord\.gg\/[a-z0-9]+$/,
  ];

  return discordPatterns.some((pattern) => pattern.test(normalized));
}

export default isDiscordLink;
