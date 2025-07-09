/**
 * Determines if an error is a network-related error.
 * 
 * Checks both common Node.js network error codes and known Discord.js or HTTP client error names.
 * 
 * @param error - The error object to check.
 * @returns boolean - True if the error is considered a network error, otherwise false.
 */
function isNetworkError(error: any): boolean {
  // Common network-related error codes in Node.js
  const netErrorCodes = [
    "ENOTFOUND",       // DNS lookup failed
    "EAI_AGAIN",       // DNS lookup timed out
    "ECONNREFUSED",    // Connection refused by server
    "ECONNRESET",      // Connection reset by peer
    "ETIMEDOUT",       // Connection timed out
    "EHOSTUNREACH",    // Host unreachable
    "ENETUNREACH",     // Network unreachable
    "EPIPE"            // Broken pipe
  ];

  // Known Discord or websocket related error names
  const discordErrors = [
    "TokenInvalid",            // Discord token is invalid
    "WebSocketConnectionError",// WebSocket connection error
    "GatewayReconnectFailed"   // Discord gateway reconnect failed
  ];

  return (
    netErrorCodes.includes(error.code) ||  // Check error code against known network codes
    discordErrors.includes(error.name) ||  // Check error name against Discord-specific errors
    error.name === "FetchError" ||         // Fetch API error
    error.name === "AxiosError" ||         // Axios HTTP client error
    error.name === "ConnectTimeoutError" ||// Connection timeout error
    error.name === "AbortError"             // Request aborted error
  );
}

export default isNetworkError;
