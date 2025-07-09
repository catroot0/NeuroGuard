/**
 * Checks if a given string is a valid Discord invite link.
 * Supports multiple URL formats like discord.gg, discord.com/invite, discordapp.com/invite,
 * with or without protocol and www.
 * 
 * @param link - The string to check.
 * @returns boolean - True if the string matches a Discord invite link pattern.
 */
function isDiscordLink(link: string): boolean {
  const normalized = link.trim().toLowerCase();

  // Array of regex patterns to match common Discord invite URL formats
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
