import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "World Explorer - Discover Every Country" },
    {
      name: "description",
      content:
        "Explore detailed information about every country in the world — from capitals and regions to geography and culture.",
    },
  ];
}

export default function Home() {
  return <div>Setup the project</div>;
}
