import { ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { failedToFetchGuildErrorEmbed, IsNotSetupErrorEmbed, resetSuccessfulEmbed } from "../helpers/embeds.js";
import remove from "../database/remove.js";
import logger from "../logging/logger.js";
import get from "../database/get.js";

async function reset(interaction: ChatInputCommandInteraction) {
  try {
    await interaction.deferReply({ flags: [MessageFlags.Ephemeral] });

    const match = await get(interaction.guild!.id);
    if (match === false) {
      await interaction.followUp({ embeds: [IsNotSetupErrorEmbed] });
      return;
    } else if (match === null) {
      await interaction.followUp({ embeds: [failedToFetchGuildErrorEmbed] });
      return;
    }

    const removeSuccessful = await remove(match);

    if (removeSuccessful) {
      await interaction.followUp({ embeds: [resetSuccessfulEmbed] });
    } else {
      await interaction.followUp("i wanna die");
    }
  } catch (error) {
    await logger.error(`Unexpected error happened while resetting the bot for guild ${interaction.guild!.id}.`);
    await logger.error(error);
    console.error(`Unexpected error happened while resetting the bot for guild ${interaction.guild!.id}.`);
  }
}

export default reset;
