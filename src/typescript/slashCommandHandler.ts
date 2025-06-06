import { ChatInputCommandInteraction } from "discord.js";
import verify from "./commands/verify.js";

async function commandHandler(interaction: ChatInputCommandInteraction, commandName: string) {
  switch (commandName) {
    case "echo": {
      const input = interaction.options.getString("input");
      await interaction.reply(input ?? "No input provided.");
      break;
    }
    case "verify": {
      await verify(interaction);
      break;
    }
    default: {
      await interaction.reply({ content: "Unknown command.", ephemeral: true });
      break;
    }
  }
}

export default commandHandler;
