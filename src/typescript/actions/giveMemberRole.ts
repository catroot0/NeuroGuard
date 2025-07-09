import client from "../client/client.js";
import { GuildStore } from "../database/cache.js";
import logger from "../logging/logger.js";

async function giveMemberRole(guildId:string, userId: string) {
  try {
    const guild = await client.guilds.fetch(guildId);
    const member = await guild.members.fetch(userId);
    const roleId = GuildStore.getById(guildId)!.memberRole;

    await logger.info(`Giving ${member.id} member role.`);
    console.log(`Giving ${member.id} member role.`);

    await member.roles.add(roleId);

    await logger.info(`Role ${roleId} added to user ${member.user.username} (${member.user.id}) successfully.`);
    console.log(`Role ${roleId} added to user ${member.user.username} (${member.user.id}) successfully.`)
  } catch (error) {
    await logger.error(`Failed to add member role to user!`);
    console.error(`Failed to add member role to user!`);
  }

}

export default giveMemberRole;