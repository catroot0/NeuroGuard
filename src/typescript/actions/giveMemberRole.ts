// Import required modules and client instance
import client from "../client/client.js";
import { GuildStore } from "../database/cache.js";
import logger from "../logging/logger.js";

// This function assigns the configured "member role" to a user in a specific guild
async function giveMemberRole(guildId: string, userId: string) {
  try {
    // Fetch the guild (server) by its ID from Discord API
    const guild = await client.guilds.fetch(guildId);

    // Fetch the guild member (user) by their ID
    const member = await guild.members.fetch(userId);

    // Retrieve the role ID for the "member" role from the cached guild store
    const roleId = GuildStore.getById(guildId)!.memberRole;

    // Log the action of assigning the member role
    await logger.info(`Giving ${member.id} member role.`);
    console.log(`Giving ${member.id} member role.`);

    // Add the member role to the user
    await member.roles.add(roleId);

    // Log success confirmation
    await logger.info(`Role ${roleId} added to user ${member.user.username} (${member.user.id}) successfully.`);
    console.log(`Role ${roleId} added to user ${member.user.username} (${member.user.id}) successfully.`);
  } catch (error) {
    // Log any errors that occur during the role assignment process
    await logger.error(`Failed to add member role to user!`);
    console.error(`Failed to add member role to user!`);
  }
}

// Export the function so it can be used in other modules
export default giveMemberRole;
