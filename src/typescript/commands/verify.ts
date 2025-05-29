import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { clientId, redirectUrl } from "../config.js";
import createOAuthURL from "../server/createOAuthURL.js";

const AuthURL = createOAuthURL(clientId!, redirectUrl!);

// prettier-ignore
async function verify(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply();

  const embed = new EmbedBuilder()
    .setTitle("Verify")
    .setDescription(`To Verify... Please Authorize The Bot Through [This Link](${AuthURL})`)
    .setColor("Aqua")

    await interaction.followUp({embeds: [embed]})
}

export default verify;
