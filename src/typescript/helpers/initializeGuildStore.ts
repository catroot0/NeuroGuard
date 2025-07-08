import axios from "axios";
import { GuildStore } from "../database/cache.js";

async function initializeGuildStore() {
  console.log("[GuildStore] Initializing from Firebase...");

  try {
    const res = await axios.get("https://guilds-19a6a-default-rtdb.firebaseio.com/guilds.json");

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
