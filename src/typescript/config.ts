import dotenv from "dotenv";
// Load environment variables from a .env file into process.env
dotenv.config();

// Export configuration variables from environment variables for use throughout the app
export const token = process.env.token;           // Discord bot token
export const clientId = process.env.clientId;     // Discord application client ID
export const clientSecret = process.env.clientSecret; // Discord application client secret
export const redirectUrl = process.env.redirectUrl;   // OAuth2 redirect URL
export const databaseUrl = process.env.databaseUrl;   // Database connection URL
export const host = process.env.host || "0.0.0.0";     // Host for Express server, default to all interfaces
export const port = process.env.port || "3000";        // Port for Express server, default 3000
