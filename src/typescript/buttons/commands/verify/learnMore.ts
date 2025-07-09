// Import necessary types and modules
import { ButtonInteraction, MessageFlags } from "discord.js";
import { verifyLearnMoreButtonEmbed } from "../../../helpers/embeds.js";
import logger from "../../../logging/logger.js";

// This function handles the interaction when a user clicks the "Learn More" button
async function learnMoreButton(interaction: ButtonInteraction) {
  try {
    // Reply to the button interaction with the embed
    // The message is ephemeral, so only the user who clicked will see it
    await interaction.reply({
      embeds: [verifyLearnMoreButtonEmbed],
      flags: [MessageFlags.Ephemeral]
    });
  } catch (error) {
    // Log any errors that occur while attempting to send the reply
    await logger.error(`unexpected error happened while sending learn more embed! ${error}`);
    console.log(`unexpected error happened while sending learn more embed! ${error}`);
  }
}

// Export the function to be used elsewhere (e.g., in interaction handlers)
export default learnMoreButton;
