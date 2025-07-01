import { ChatInputCommandInteraction, MessageFlags } from "discord.js";
import verify from "../commands/verify.js";
import setup from "../commands/setup.js";

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
    case "setup": {
      await setup(interaction);
      break;
    }
    default: {
      await interaction.reply({ content: "Unknown command.", flags: MessageFlags.Ephemeral});
      break;
    }
  }
}

export default commandHandler;
