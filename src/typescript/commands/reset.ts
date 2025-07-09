import { ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { IsNotSetupErrorEmbed, resetSuccessfulEmbed } from "../helpers/embeds.js";
import remove from "../database/remove.js";
import logger from "../logging/logger.js";
import { GuildStore } from "../database/cache.js";

async function reset(interaction: ChatInputCommandInteraction) {
  try {
    // Defer the reply to give time for processing and make the response ephemeral (only visible to the user)
    await interaction.deferReply({ flags: [MessageFlags.Ephemeral] });

    // Retrieve stored configuration for the guild
    const match = GuildStore.getById(interaction.guild!.id);

    // If no config exists, the bot is not set up in this server
    if (!match) {
      await interaction.followUp({ embeds: [IsNotSetupErrorEmbed] }); // Send embed saying bot isn't set up
      return;
    }

    // Attempt to remove the guild's configuration from the database
    const removeSuccessful = await remove(match);

    // Respond based on whether the reset was successful
    if (removeSuccessful) {
      await interaction.followUp({ embeds: [resetSuccessfulEmbed] }); // Success message
    } else {
      await interaction.followUp("reset failed... dude go thank your god im telling you this instead of \"i wanna die\", yes, that was what this text was before");
    }
  } catch (error) {
    // Log and print any unexpected errors during reset
    await logger.error(`Unexpected error happened while resetting the bot for guild ${interaction.guild!.id}.`);
    await logger.error(error);
    console.error(`Unexpected error happened while resetting the bot for guild ${interaction.guild!.id}.`);
  }
}

export default reset;
