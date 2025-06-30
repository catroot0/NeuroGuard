import { User } from "discord.js";

interface DiscordGuild {
  id: string;
  name: string;
  icon: string | null;
  banner: string | null;
  owner: boolean;
  permissions: string;
  features: string[];
}

interface NormalizedGuild {
  name: string;
  id: string;
  icon: string | null;
  banner: string | null;
  isOwner: boolean;
}

interface UserData {
  guilds: NormalizedGuild[];
  identity: User;
}

export { DiscordGuild, NormalizedGuild, UserData };
