interface DiscordGuild {
  id: string;
  name: string;
  icon: string | null;
  banner: string | null;
  owner: boolean;
  permissions: string;
  features: string[];
}

export { DiscordGuild };
