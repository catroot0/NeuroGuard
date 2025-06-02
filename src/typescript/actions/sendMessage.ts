import { EmbedBuilder, APIEmbed } from "discord.js";
import client from "../client/client.js";
import logger from "../logging/logger.js";

async function sendMessage(userId: string, message: string | EmbedBuilder | APIEmbed) {
  try {
    const user = await client.users.fetch(userId);

    if (typeof message === "string") {
      await logger.info(`Sending Message To User ${user.id}`);
      console.log(`Sending Message To User ${user.id}`);

      await user.send(message);

      await logger.info(`Message Sended To User ${user.id} Successfully`);
      console.log(`Message Sended To User ${user.id} Successfully`);
    } else {
      await logger.info(`Sending Message(Embed) To User ${user.id}`);
      console.log(`Sending Message(Embed) To User ${user.id}`);

      await user.send({ embeds: [message] });

      await logger.info(`Message(Embed) Sended To User ${user.id} Successfully`);
      console.log(`Message(Embed) Sended To User ${user.id} Successfully`);
    }
  } catch (error) {
    await logger.warn(`Could not send DM to user ${userId}: ${error}`);
    console.log(`Could not send DM to user ${userId}`);
  }
}

export default sendMessage;
