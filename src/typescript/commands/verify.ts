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
      `> ✅ **This check is fully automated and handled on the bot's backend.**\n` +
      `> 👁️ **Nobody — including the server owner, bot owner, or anyone with access to the bot’s infrastructure — can see your server list.**\n` +
      `> 🔒 **Nothing is saved, logged, or retained.** Your data is processed once, then immediately and permanently discarded.\n\n` +
      `> 🚫 **If you're found in restricted servers, your access to this server will be automatically revoked (banned).**\n\n` +
      `📌 **Disclaimer & Developer Responsibility**\n` +
      `This bot was developed by <@1358758349054808226> ([my profile](https://discord.com/users/1358758349054808226)). The source code is **100% open source** and publicly available here:\n` +
      `🔗 [View on GitHub](https://github.com/drowningdev/NeuroGuard)\n\n` +
      `⚠️ **This bot is designed to be self-hosted.** Whoever is running it — not me — is fully responsible for its behavior.\n\n` +
      `🔧 **If you're using this bot on a server, it means someone else has hosted it.** Whether modified or not, I have no access to their instance and no control over how it’s run.\n\n` +
      `❗ **Any modification — even changing a single character — counts as a modified version.** I do not support or take responsibility for anything caused by such versions.\n\n` +
      `💬 For questions about this specific bot instance, contact the host.\n` +
      `💻 For questions about the code or development, you may contact me directly at <@1358758349054808226>.\n\n` +
      `By continuing, you agree to these terms and understand you are interacting with third-party hosted software.\n\n` +
      `👉 [Click here to verify your account](${authURL})`
    )    
    .setColor("Red");

  await interaction.followUp({ embeds: [embed] });
}

export default verify;
