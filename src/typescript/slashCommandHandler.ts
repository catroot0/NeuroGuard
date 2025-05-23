import { ChatInputCommandInteraction } from "discord.js";

async function commandHandler(interaction: ChatInputCommandInteraction, commandName: string) {
  if (commandName === "echo") {
    await interaction.reply(`${interaction.options.getString("input")}`);
  }
}

export default commandHandler;
