import { DiscordSDK } from "@discord/embedded-app-sdk";

export let discordSdk: DiscordSDK | undefined;

export const initizlizeDiscordSdk = async (clientId: string) => {
  if (discordSdk === undefined) {
    discordSdk = new DiscordSDK(clientId);
    // Wait for READY payload from the discord client
    await discordSdk.ready();

    // Pop open the OAuth permission modal and request for access to scopes listed in scope array below
    const { code } = await discordSdk.commands.authorize({
      client_id: clientId,
      response_type: "code",
      state: "",
      prompt: "none",
      scope: ["identify", "applications.commands"],
    });

    // Retrieve an access_token from your application's server
    const response = await fetch("/.proxy/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
      }),
    });
    const { access_token } = await response.json<{ access_token: string }>();

    // Authenticate with Discord client (using the access_token)
    await discordSdk.commands.authenticate({
      access_token,
    });
  }
};
