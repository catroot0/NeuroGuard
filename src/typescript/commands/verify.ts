import { ChatInputCommandInteraction, EmbedBuilder, MessageFlags } from "discord.js";
import { clientId, redirectUrl } from "../config.js";
import createOAuthURL from "../server/createOAuthURL.js";

async function verify(interaction: ChatInputCommandInteraction) {
  const authURL = createOAuthURL(clientId!, redirectUrl!, interaction.guild!.id);
  await interaction.deferReply({ flags: MessageFlags.Ephemeral });

  const embed = new EmbedBuilder()
    .setTitle("🔐 Account Verification")
    .setDescription(
      `To access this server, you'll need to verify your account by authorizing the bot through Discord.\n\n` +
      `As part of the process, the bot will request temporary access to your **server list**. This is **only used to automatically check** if you're part of any **NSFW or inappropriate communities** — such as servers focused on **pornographic content, "condos", or similar topics**.\n\n` +
      `> ✅ **This check is fully automated and done on the bot's backend.**\n` +
      `> 👁️ **Nobody — including the server owner, bot owner, or anyone with access to the bot's console — will be able to view your server list.**\n` +
      `> 🔒 **Nothing is stored, logged, or shared.** Your data is discarded immediately after the check is completed.\n\n` +
      `> 🚫 **If you're found in restricted servers, your access to this server will be automatically revoked (banned).**\n\n` +
      `By proceeding, you confirm that you understand and agree to these terms.\n\n` +
      `👉 [Click here to verify your account](${authURL})\n\n` +
      `If you have any questions or concerns, feel free to contact a server moderator or admin.`
    )
    .setColor("Red");

  await interaction.followUp({ embeds: [embed] });
}

export default verify;
