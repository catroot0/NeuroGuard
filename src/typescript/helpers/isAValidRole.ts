import { APIRole, Role } from "discord.js";

function isAValidRole(role: Role | APIRole, guildId: string): boolean {
  if ('managed' in role && (role.managed || role.id === guildId)) {
    return false;
  } else {
    return true
  }
}

export default isAValidRole