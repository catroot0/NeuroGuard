import { ChatInputCommandInteraction, EmbedBuilder, MessageFlags, ActionRowBuilder, ButtonBuilder, ButtonStyle, } from "discord.js";
import { clientId, redirectUrl } from "../config.js";
import createOAuthURL from "../server/createOAuthURL.js";
import logger from "../logging/logger.js";
import isInDatabase from "../helpers/isInDatabase.js";

async function verify(interaction: ChatInputCommandInteraction) {
  try {
    // Check if the bot is set up for this guild (exists in the database)
    if (!isInDatabase(interaction.guild!.id)) {
      // If not set up, inform the user and return early
      return await interaction.reply("This bot is not setup for this server. please setup the bot using /setup");
    }

    // Generate the OAuth2 authorization URL for verification using clientId, redirect URL, and guild ID
    const authURL = createOAuthURL(clientId!, redirectUrl!, interaction.guild!.id);

    // Defer the reply to acknowledge the interaction and make it ephemeral (visible only to the user)
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    // Build an embed message to prompt the user to verify their account
    const embed = new EmbedBuilder()
      .setTitle("🔐 Account Verification")
      .setDescription(
        `To access this server, please verify your account by authorizing the bot.\n\n` +
        `👉 [Click here to verify your account](${authURL})`
      )
      .setColor("Red");

    // Create a button component labeled "Learn More" that users can click for more information
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel("Learn More")
        .setStyle(ButtonStyle.Primary)
        .setCustomId("learn_more_about_verify")
    );

    // Send the embed and button as a follow-up response
    await interaction.followUp({ embeds: [embed], components: [row] });
  } catch (error) {
    // Log any unexpected errors that occur while sending the verification embed
    await logger.error(`unexpected error happened while sending the verify embed! ${error}`);
    console.log(`unexpected error happened while sending the verify embed! ${error}`);
  }
}

export default verify;
