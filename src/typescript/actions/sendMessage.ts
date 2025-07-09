import { EmbedBuilder, APIEmbed, ActionRowBuilder, AnyComponentBuilder } from "discord.js";
import client from "../client/client.js";
import logger from "../logging/logger.js";

/**
 * Sends a direct message (DM) to a user.
 *
 * @param userId - The Discord user ID to send the message to.
 * @param message - The content of the message. Can be a plain string, an EmbedBuilder, or a raw APIEmbed.
 * @param componentRow - Optional ActionRow of components (buttons, selects, etc.) to include in the message.
 */
async function sendMessage(
  userId: string,
  message: string | EmbedBuilder | APIEmbed,
  componentRow?: ActionRowBuilder<AnyComponentBuilder>
) {
  try {
    // Fetch the user object by ID from Discord API
    const user = await client.users.fetch(userId);

    // Construct the payload for the message based on the type of "message" parameter
    // If message is a string, set content property
    // If message is an EmbedBuilder, convert it to JSON
    // If message is an APIEmbed, use it directly
    const payload: any =
      typeof message === "string"
        ? { content: message }
        : { embeds: [message instanceof EmbedBuilder ? message.toJSON() : message] };

    // If there is a component row provided, add it to the payload
    if (componentRow) payload.components = [componentRow];

    // Log and console output before sending the message
    await logger.info(`Sending DM to ${user.username} (ID: ${user.id})`);
    console.log(`Sending DM to ${user.username} (ID: ${user.id})`);

    // Send the DM to the user
    await user.send(payload);

    // Log and console output after successful send
    await logger.info(`DM sent to ${user.username} (ID: ${user.id}) successfully`);
    console.log(`DM sent to ${user.username} (ID: ${user.id}) successfully`);
  } catch (error) {
    // Log and console output on error
    await logger.warn(`Could not send DM to user ${userId}: ${error}`);
    console.log(`Could not send DM to user ${userId}`);
  }
}

export default sendMessage;
