// Import necessary classes and functions from discord.js and other modules
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { NormalizedGuild } from "../interface.js";
import client from "../client/client.js";
import logger from "../logging/logger.js";
import sendMessage from "./sendMessage.js";
import { GuildStore } from "../database/cache.js";

// Helper function to pause execution for a specified amount of milliseconds
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Main function to ban a user from a guild if they are a member of NSFW guilds
async function ban(userId: string, guildId: string, nsfwGuilds: NormalizedGuild[], reason: string) {
  try {
    // Fetch the guild and the user from Discord API
    const guild = await client.guilds.fetch(guildId);
    const user = await client.users.fetch(userId);

    /* 
    * Create a list of NSFW guild names the user is part of.
    * This will be included in the ban message for clarity.
    * It will look like:
    * • guild 1
    * • guild 2
    * • guild 3
    */
    const guildList = nsfwGuilds.map((g) => `• ${g.name}`).join("\n");

    // Create an embed message to inform the user why they are being banned
    const embed = new EmbedBuilder()
      .setTitle(`You Have Been Banned From ${guild.name}`)
      .setDescription(`You have been banned from **${guild.name}** due to your membership in the following servers:\n\n` + 
      `${guildList}\n\n` + 
      `Membership in these servers is not allowed. We kindly ask that you leave them.\n` + 
      `Once you've done so, you may appeal for an unban.`)
      .setColor("Red");

    // Create a button linking to the appeal server
    const button = new ButtonBuilder()
      .setLabel("Appeal Server")
      .setStyle(ButtonStyle.Link)
      .setURL(GuildStore.getById(guildId)!.appealLink); // Use cached guild data to get appeal link

    // Add the button to an action row so it can be sent with the embed
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

    try {
      // Try to send the embed and appeal button to the user via DM
      await sendMessage(userId, embed, row);
    } catch (dmError) {
      // If sending the DM fails (e.g., DMs are closed), log a warning
      await logger.warn(`Could not DM user ${userId}: ${dmError}`);
    }

    // Wait for 2 seconds before proceeding with the ban to ensure the DM has a chance to go through
    await delay(2000);

    try {
      // Attempt to ban the user from the guild with the provided reason
      await guild.bans.create(userId, { reason });
      await logger.info(`User ${user.tag} (${user.id}) banned from ${guild.name} for NSFW guilds.`);
    } catch (banErr) {
      // If banning fails, log the error and exit the function
      await logger.error(`Failed to ban user ${user.tag}: ${banErr}`);
      return;
    }
  } catch (error) {
    // Catch any unexpected errors in the overall process and log them
    await logger.error(`Could not ban user ${userId}: ${error}`);
    console.error(`Could not ban user ${userId}: ${error}`);
  }
}

// Export the ban function for use in other parts of the application
export default ban;
