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

export { DiscordGuild, NormalizedGuild };
