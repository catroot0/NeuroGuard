import { EmbedBuilder, APIEmbed, ActionRowBuilder, AnyComponentBuilder } from "discord.js";
import client from "../client/client.js";
import logger from "../logging/logger.js";

async function sendMessage(userId: string, message: string | EmbedBuilder | APIEmbed, componentRow?: ActionRowBuilder<AnyComponentBuilder>) {
  try {
    const user = await client.users.fetch(userId);
    const payload: any = typeof message === "string" ? { content: message } : { embeds: [message instanceof EmbedBuilder ? message.toJSON() : message] };

    if (componentRow) payload.components = [componentRow];

    await logger.info(`Sending DM to ${user.username} (ID: ${user.id})`);
    console.log(`Sending DM to ${user.username} (ID: ${user.id})`);

    await user.send(payload);

    await logger.info(`DM sent to ${user.username} (ID: ${user.id}) successfully`);
    console.log(`DM sent to ${user.username} (ID: ${user.id}) successfully`);
  } catch (error) {
    await logger.warn(`Could not send DM to user ${userId}: ${error}`);
    console.log(`Could not send DM to user ${userId}`);
  }
}

export default sendMessage;
