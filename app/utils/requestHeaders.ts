import { Env } from "load-context";

export function requestHeaders(
  env: Env,
  customHeaders: Record<string, string> = {}
) {
  const headers: Record<string, string> = {};
  headers["CF-Access-Client-Id"] = env.CLIENT_ID;
  headers["CF-Access-Client-Secret"] = env.CLIENT_SECRET;
  Object.entries(customHeaders).forEach(([key, value]) => {
    headers[key] = value;
  });

  headers["Authorization"] = `Bot ${env.BOT_TOKEN}`;
  return headers;
}
