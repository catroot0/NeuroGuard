import { ButtonInteraction, MessageFlags } from "discord.js";
import { verifyLearnMoreButtonEmbed } from "../../../helpers/embeds.js";
import logger from "../../../logging/logger.js";

async function learnMoreButton(interaction: ButtonInteraction) {
  try {
    await interaction.reply({embeds: [verifyLearnMoreButtonEmbed], flags: [MessageFlags.Ephemeral]})
  } catch (error) {
    await logger.error(`unexpected error happened while sending learn more embed! ${error}`);
    console.log(`unexpected error happened while sending learn more embed! ${error}`);
  }
}

export default learnMoreButton