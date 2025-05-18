import { ChatInputCommandInteraction } from "discord.js";

async function commandHandler(interaction: ChatInputCommandInteraction, commandName: string) {
  if (commandName === "test") {
    await interaction.reply("test");
  }
}

export default commandHandler;
