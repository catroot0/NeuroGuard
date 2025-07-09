import { DatabaseData, RawDatabaseData } from "../types.js";

// Internal map to store guild data keyed by Firebase key (string)
const guilds = new Map<string, DatabaseData>();

export const GuildStore = {
  // Add or update a guild entry in the store using the Firebase key and raw data
  set(firebaseKey: string, data: RawDatabaseData) {
    // Store a new object combining raw data with its firebaseKey included
    guilds.set(firebaseKey, { ...data, firebaseKey });
  },

  // Load multiple guild entries at once from a Firebase response object
  setAll(data: Record<string, RawDatabaseData>) {
    // Iterate over each entry and add it to the map with the key embedded in the data
    for (const [firebaseKey, guildData] of Object.entries(data)) {
      guilds.set(firebaseKey, { ...guildData, firebaseKey });
    }
  },

  // Retrieve a guild entry by its Firebase key (fast lookup)
  get(firebaseKey: string): DatabaseData | undefined {
    return guilds.get(firebaseKey);
  },

  // Retrieve a guild entry by the guild's actual Discord ID (slower, iterates through all)
  getById(id: string): DatabaseData | undefined {
    for (const [, data] of guilds) {
      if (data.id === id) return data;
    }
    return undefined;
  },

  // Remove a guild entry from the store by its Firebase key
  delete(firebaseKey: string) {
    guilds.delete(firebaseKey);
  },

  // Return the entire map of guilds (useful for bulk operations or cache inspection)
  getAll(): Map<string, DatabaseData> {
    return guilds;
  }
};
