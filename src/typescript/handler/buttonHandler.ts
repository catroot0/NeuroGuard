import { ButtonInteraction } from "discord.js";
import learnMoreButton from "../buttons/commands/verify/learnMore.js";

async function buttonHandler(interaction: ButtonInteraction, customId: string) {
  switch (customId) {
    case "learn_more_about_verify":
      await learnMoreButton(interaction);
  }
}

export default buttonHandler;