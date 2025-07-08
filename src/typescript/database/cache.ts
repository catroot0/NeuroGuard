import { DatabaseData, RawDatabaseData } from "../types.js";

const guilds = new Map<string, DatabaseData>();

export const GuildStore = {
  // Accept full typed object (with key)
  set(firebaseKey: string, data: RawDatabaseData) {
    guilds.set(firebaseKey, { ...data, firebaseKey });
  },

  // Bulk load from Firebase response
  setAll(data: Record<string, RawDatabaseData>) {
    for (const [firebaseKey, guildData] of Object.entries(data)) {
      guilds.set(firebaseKey, { ...guildData, firebaseKey });
    }
  },

  get(firebaseKey: string): DatabaseData | undefined {
    return guilds.get(firebaseKey);
  },

  getById(id: string): DatabaseData | undefined {
    for (const [, data] of guilds) {
      if (data.id === id) return data;
    }
    return undefined;
  },

  delete(firebaseKey: string) {
    guilds.delete(firebaseKey);
  },

  getAll(): Map<string, DatabaseData> {
    return guilds;
  }
};
