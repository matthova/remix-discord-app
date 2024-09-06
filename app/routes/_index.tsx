import * as React from "react";
import type { MetaFunction, LoaderFunction } from "@remix-run/cloudflare";
import { initizlizeDiscordSdk } from "~/utils/discordSdk";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Discord app with Activity" },
    {
      name: "description",
      content: "A demo Discord App with an Activity",
    },
  ];
};

interface LoaderData {
  clientId: string;
}
export const loader: LoaderFunction = ({ request, context }): LoaderData => {
  return {
    clientId: context.cloudflare.env.CLIENT_ID,
  };
};

export default (function ({ context }) {
  const { clientId } = useLoaderData<LoaderData>();
  React.useEffect(() => {
    initizlizeDiscordSdk(clientId);
  }, [clientId]);
  return <div>Demo Discord App with an Activity</div>;
} satisfies LoaderFunction);
