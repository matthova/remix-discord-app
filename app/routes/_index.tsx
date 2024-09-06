import type { MetaFunction } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
    { title: "Discord app with Activity" },
    {
      name: "description",
      content: "A demo Discord App with an Activity",
    },
  ];
};

export default function Index() {
  return <div>Demo Discord App with an Activity</div>;
}
