import { APIRole, Role } from "discord.js";

/**
 * Checks if a given role is a valid user role.
 * Excludes managed roles (bot/integration roles) and the @everyone role (which has the same ID as the guild).
 * 
 * @param role - The role object (Role or APIRole) to validate
 * @param guildId - The ID of the guild to compare against the role ID (for @everyone check)
 * @returns boolean - true if valid role, false otherwise
 */
function isAValidRole(role: Role | APIRole, guildId: string): boolean {
  // If the role is managed by a bot/integration or is the @everyone role, it's invalid
  if ('managed' in role && (role.managed || role.id === guildId)) {
    return false;
  }

  // Otherwise, it’s a valid role
  return true;
}

export default isAValidRole;
