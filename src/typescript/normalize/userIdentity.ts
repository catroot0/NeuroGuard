import { User } from "discord.js";
import { CleanedUser } from "../interface.js";

function normalizeUserIdentity(user: User): CleanedUser {
  return {
    username: user.username,
    id: user.id,
  };
}

export default normalizeUserIdentity;
