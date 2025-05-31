import { EmbedBuilder, APIEmbed } from "discord.js";
import client from "../client/client.js";
import logger from "../logging/logger.js";

async function sendMessage(userId: string, message: string | EmbedBuilder | APIEmbed) {
  try {
    const user = await client.users.fetch(userId);

    if (typeof message === "string") {
      await user.send(message);
    } else {
      await user.send({ embeds: [message] });
    }
  } catch (error) {
    await logger.warn(`Could not send DM to user ${userId}: ${error}`);
  }
}

export default sendMessage;
