import { ChatInputCommandInteraction, MessageFlags } from "discord.js";
import verify from "../commands/verify.js";
import setup from "../commands/setup.js";
import reset from "../commands/reset.js";

// Main handler for slash commands
async function commandHandler(interaction: ChatInputCommandInteraction, commandName: string) {
  switch (commandName) {
    case "echo": {
      // Get the "message" string option from the command input
      const input = interaction.options.getString("message");
      // Reply with the provided message or a default if none provided
      await interaction.reply(input ?? "No input provided.");
      break;
    }
    case "verify": {
      // Call the verify command handler
      await verify(interaction);
      break;
    }
    case "setup": {
      // Call the setup command handler
      await setup(interaction);
      break;
    }
    case "reset": {
      // Call the reset command handler
      await reset(interaction);
      break;
    }
    default: {
      // If an unknown command is received, reply with an ephemeral message
      await interaction.reply({ content: "Unknown command.", flags: MessageFlags.Ephemeral });
      break;
    }
  }
}

export default commandHandler;
