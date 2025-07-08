import dotenv from "dotenv";
dotenv.config();

export const token = process.env.token;
export const clientId = process.env.clientId;
export const clientSecret = process.env.clientSecret;
export const redirectUrl = process.env.redirectUrl;
export const databaseUrl = process.env.databaseUrl;
export const host = process.env.host || "0.0.0.0";
export const port = process.env.port || "3000";
