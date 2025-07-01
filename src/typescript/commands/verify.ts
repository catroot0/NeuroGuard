import { ChatInputCommandInteraction, EmbedBuilder, MessageFlags, ActionRowBuilder, ButtonBuilder, ButtonStyle,} from "discord.js";
import { clientId, redirectUrl } from "../config.js";
import createOAuthURL from "../server/createOAuthURL.js";
import logger from "../logging/logger.js";

async function verify(interaction: ChatInputCommandInteraction) {
  try {
    const authURL = createOAuthURL(clientId!, redirectUrl!, interaction.guild!.id);
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
  
    const embed = new EmbedBuilder()
      .setTitle("🔐 Account Verification")
      .setDescription(
        `To access this server, please verify your account by authorizing the bot.\n\n` +
        `👉 [Click here to verify your account](${authURL})`
      )    
      .setColor("Red");
  
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel("Learn More")
        .setStyle(ButtonStyle.Primary)
        .setCustomId("learn_more_about_verify")
    );
  
    await interaction.followUp({ embeds: [embed], components: [row] });
  } catch (error) {
    await logger.error(`unexpected error happened while sending the verify embed! ${error}`);
    console.log(`unexpected error happened while sending the verify embed! ${error}`);
  }
}

export default verify;
