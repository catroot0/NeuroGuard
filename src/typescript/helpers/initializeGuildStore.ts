import axios from "axios";
import { databaseUrl } from "../config.js";
import { GuildStore } from "../database/cache.js";

async function initializeGuildStore() {
  console.log("[GuildStore] Initializing from Firebase...");

  try {
    const res = await axios.get(databaseUrl!);

    if (res.data) {
      GuildStore.setAll(res.data);
      const count = Object.keys(res.data).length;
      console.log(`[GuildStore] Loaded ${count} guild(s) from Firebase.`);
    } else {
      console.warn("[GuildStore] No data returned from Firebase.");
    }
  } catch (error) {
    console.error("[GuildStore] Failed to load guilds from Firebase:", error);
  }
}

export default initializeGuildStore;
