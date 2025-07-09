// Import necessary modules and types
import client from "../client/client.js";
import logger from "../logging/logger.js";
import { TextChannel } from "discord.js";

// This function changes permissions for a specified channel in a guild.
// It sets up permissions for @everyone and a specific member role, typically for a verification system.
async function changeChannelPermission(guildId: string, channelId: string, memberRoleId: string): Promise<boolean | void> {
  try {
    // Get the guild (server) from the client's cache
    const guild = client.guilds.cache.get(guildId);

    // Check if the guild exists — bot could have been removed or restarted in the meantime
    if (!guild) {
      console.error(`Guild ${guildId} not found.`);
      await logger.error(`Guild ${guildId} not found.`);
      return;
    }

    // Fetch the channel from the guild and cast it to a TextChannel
    const channel = await guild.channels.fetch(channelId) as TextChannel;

    // Check if the channel exists in the guild
    if (!channel) {
      console.error(`Channel ${channelId} not found in guild ${guildId}.`);
      await logger.error(`Channel ${channelId} not found in guild ${guildId}.`);
      return;
    }

    // Log that permission changes are about to be made
    await logger.info(`Updating permissions for channel ${channel.id} in guild ${guild.id}.`);

    // Get the @everyone role (automatically created by Discord for every guild)
    const everyoneRole = guild.roles.everyone;

    // Fetch the member role that should be restricted from seeing the verification channel
    const memberRole = await guild.roles.fetch(memberRoleId);

    // Check if the specified member role exists
    if (!memberRole) {
      console.error(`Role ${memberRoleId} not found in guild ${guildId}`);
      await logger.error(`Role ${memberRoleId} not found in guild ${guildId}`);
      return;
    }

    // Allow @everyone to send messages, view the channel, and use slash commands in the verification channel
    await channel.permissionOverwrites.edit(everyoneRole, {
      SendMessages: true,
      ViewChannel: true,
      UseApplicationCommands: true
    });

    // Restrict the member role from viewing the verification channel
    await channel.permissionOverwrites.edit(memberRole, {
      ViewChannel: false
    });

    // Remove all permissions from @everyone globally across the server
    // (so the only visible channel is likely the verification channel)
    await guild.roles.everyone.setPermissions([]);

    // Log success
    console.log(`Permissions successfully updated for channel ${channel.id} in guild ${guild.id}.`);
    await logger.info(`Permissions successfully updated for channel ${channel.id} in guild ${guild.id}.`);

    return true;
  } catch (error) {
    // Log any unexpected errors that occur during the process
    console.error("Failed to change channel permissions!");
    await logger.error(`Error while changing channel permissions: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Export the function to be used in other parts of the application
export default changeChannelPermission;
