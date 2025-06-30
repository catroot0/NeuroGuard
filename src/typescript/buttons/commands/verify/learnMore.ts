import { ButtonInteraction, EmbedBuilder, MessageFlags } from "discord.js";

async function learnMoreButton(interaction: ButtonInteraction) {
  const embed = new EmbedBuilder()
  .setTitle("How Verification Works")
  .setDescription(
    `When you click **Verify**, the bot uses Discord OAuth2 to ***TEMPORARILY*** access your account's basic info — such as your server list — to check if it meets this server's safety standards.\n\n` +
    `It automatically scans for involvement in:\n` +
    `• NSFW or inappropriate communities\n` +
    `• "condo"\n\n` +
    `❌ If your account is found in restricted servers, you will be **automatically banned** from this server.\n` +
    `📩 A direct message will be sent with a link to appeal.\n\n` +
    `**This bot may be self-hosted. Whoever runs it is fully responsible for how it operates and how your data is handled.**\n` +
    `**The original developer has no access to hosted instances and is not responsible for how others use the code**.\n\n` +
    `🔗 [View source code on GitHub](https://github.com/drowningdev/NeuroGuard)`
  )
  .setColor("Green");

  await interaction.reply({embeds: [embed], flags: [MessageFlags.Ephemeral]})
}

export default learnMoreButton