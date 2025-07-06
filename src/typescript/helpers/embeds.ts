import { EmbedBuilder } from "discord.js";

const invalidChannelErrorEmbed = new EmbedBuilder()
  .setTitle("Invalid Channel")
  .setDescription("Please select a text channel for verification. Voice channels are not supported.")
  .setColor("Red");

const invalidRoleErrorEmbed = new EmbedBuilder()
  .setTitle("Invalid Role")
  .setDescription("You can't use bot roles, integration roles, or @everyone. Choose a normal user role.")
  .setColor("Red");
  
const invalidAppealLinkErrorEmbed = new EmbedBuilder()
  .setTitle("🚧 Something went wrong")
  .setDescription(
  "Yeahhh so... I messed something up here and the appeal system is kinda broken right now 😅" +
  "\n\nWhile I fix it, just follow [this tutorial](https://www.youtube.com/watch?v=dQw4w9WgXcQ) — it should explain everything better than I can."
  )
  .setColor("Orange")
  .setFooter({ text: "devs r doing their best fr" });

const isInDatabaseErrorEmbed = new EmbedBuilder()
  .setTitle("Setup Failed")
  .setDescription("Neuro guard is already set up. if you think this is a mistake please use /reset")
  .setColor("Red")

const setupSuccessfulEmbed = new EmbedBuilder()
  .setTitle("Setup Successful!")
  .setDescription("Neuro guard has been configured successfully. You can now use all features.")
  .setColor("Green")
  .setFooter({ text: "Thank you for using Neuro Guard!" });

const setupFailedErrorEmbed = new EmbedBuilder()
  .setTitle("Setup Failed")
  .setDescription("Something went wrong while saving your configuration. Please try again later or contact support.")
  .setColor("Red")
  .setFooter({ text: "If this issue persists, please report it." });

const IsNotSetupErrorEmbed = new EmbedBuilder()
  .setTitle("Bot is not set up")
  .setDescription("Neuro guard is not set up in this server. please setup the bot by using /setup command.")
  .setColor("Orange")

const resetSuccessfulEmbed = new EmbedBuilder()
  .setTitle("Reset Successful")
  .setDescription("Neuro guard has been reset successfully. in order to setup neuro guard again use /setup command.")
  .setColor("Green")

const verifyLearnMoreButtonEmbed = new EmbedBuilder()
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

export { invalidChannelErrorEmbed, invalidRoleErrorEmbed, invalidAppealLinkErrorEmbed, isInDatabaseErrorEmbed, setupSuccessfulEmbed, resetSuccessfulEmbed, setupFailedErrorEmbed, IsNotSetupErrorEmbed, verifyLearnMoreButtonEmbed }