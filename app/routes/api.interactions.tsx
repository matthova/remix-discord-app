import { ActionFunction, json } from "@remix-run/cloudflare";
import { InteractionType, InteractionResponseType } from "discord-interactions";
import { verifyKey } from "~/utils/verifyKey";

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 * Parse request body and verifies incoming requests using discord-interactions package
 */
export const action: ActionFunction = async ({ request, context }) => {
  // verifyKeyMiddleware(process.env.PUBLIC_KEY)
  const signature = request.headers.get("X-Signature-Ed25519");
  const timestamp = request.headers.get("X-Signature-Timestamp");
  const requestText = await request.text();
  const { type } = JSON.parse(requestText);

  const isValidRequest = await verifyKey(
    requestText,
    signature,
    timestamp,
    context.cloudflare.env.PUBLIC_KEY
  );
  if (!isValidRequest) {
    return json({ error: "Bad request signature" }, { status: 401 });
  }

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return json({ type: InteractionResponseType.PONG });
  }

  console.error("unknown interaction type", type);
  return json({ error: "unknown interaction type" }, { status: 400 });
};
