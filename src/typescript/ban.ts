import client from "./client/client.js";

async function ban(userId: string, guildId: string, reason: string) {
  const guild = await client.guilds.fetch(guildId);

  await guild.bans.create(userId, { reason: reason });
  await guild.bans.remove(userId);
}

export default ban;
