function isNetworkError(error: any): boolean {
  const netErrorCodes = [
    "ENOTFOUND", "EAI_AGAIN", "ECONNREFUSED", "ECONNRESET",
    "ETIMEDOUT", "EHOSTUNREACH", "ENETUNREACH", "EPIPE"
  ];

  const discordErrors = [
    "TokenInvalid", "WebSocketConnectionError", "GatewayReconnectFailed"
  ];

  return (
    netErrorCodes.includes(error.code) ||
    discordErrors.includes(error.name) ||
    error.name === "FetchError" ||
    error.name === "AxiosError" ||
    error.name === "ConnectTimeoutError" ||
    error.name === "AbortError"
  );
}

export default isNetworkError