import { ActionFunction } from "@remix-run/cloudflare";
import { requestHeaders } from "~/utils/requestHeaders";

export const action: ActionFunction = async ({ request, context }) => {
  const { code } = await request.json<any>();
  const tokenBody = new URLSearchParams({
    client_id: context.cloudflare.env.CLIENT_ID,
    client_secret: context.cloudflare.env.CLIENT_SECRET,
    grant_type: "authorization_code",
    code,
  });

  const response = await fetch(`https://discord.com/api/oauth2/token`, {
    method: "POST",
    headers: requestHeaders(context.cloudflare.env, {
      "Content-Type": "application/x-www-form-urlencoded",
    }),
    body: tokenBody,
  });

  if (response.status !== 200) {
    return response;
  }

  const { access_token } = await response.json<{ access_token: string }>();

  return new Response(JSON.stringify({ access_token }), {
    headers: { "Access-Control-Allow-Origin": "*" },
  });
};
