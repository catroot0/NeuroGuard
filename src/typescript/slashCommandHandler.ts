import { ChatInputCommandInteraction } from "discord.js";
import verify from "./commands/verify.js";

async function commandHandler(interaction: ChatInputCommandInteraction, commandName: string) {
  if (commandName === "echo") {
    await interaction.reply(`${interaction.options.getString("input")}`);
  } else if (commandName === "verify") {
    await verify(interaction);
  }
}

export default commandHandler;
