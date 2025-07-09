import { User } from "discord.js";

// Represents the raw guild data returned from Discord API about a user's guild
interface DiscordGuild {
  id: string;
  name: string;
  icon: string | null;     // guild icon hash or null if none
  banner: string | null;   // guild banner hash or null if none
  owner: boolean;          // whether the user is the owner of this guild
  permissions: string;     // permissions bitfield string for the user in this guild
  features: string[];      // special features of the guild (e.g. "COMMUNITY")
}

// Normalized, simplified guild data used internally
interface NormalizedGuild {
  name: string;
  id: string;
  icon: string | null;
  banner: string | null;
  isOwner: boolean;        // renamed from "owner" for clarity
}

// Data representing a user along with their guilds
interface UserData {
  guilds: NormalizedGuild[]; // list of normalized guilds
  identity: User;            // Discord.js User object representing the user
}

// Payload for guild configuration, e.g. stored in DB or sent in requests
interface GuildPayload {
  serverId: string;          // Discord guild/server ID
  appealServer: string;      // ID or link to appeal server
  memberRole: string;        // role ID used for members
  verifyChannel: string;     // channel ID where verification occurs
}

// General guild data with flexible keys
interface GuildData {
  id: string;                // guild ID
  [key: string]: any;        // other arbitrary keys and values
}

// Structure for responses related to guild data
interface GuildResponse {
  key: string;               // some identifier key
  data: GuildData;           // guild data object
}

export { DiscordGuild, NormalizedGuild, UserData, GuildPayload, GuildResponse };
