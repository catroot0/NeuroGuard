function isDiscordLink(link: string): boolean {
  if (link.startsWith("https://discord.gg/") || link.startsWith("discord.gg/")) {
    return true
  } else {
    return false
  }
}

export default isDiscordLink