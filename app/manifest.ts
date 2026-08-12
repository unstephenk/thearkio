import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "The Ark",
    short_name: "The Ark",
    description: "Custom landing pages for small businesses in Dallas-Fort Worth and beyond.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#090a09",
    theme_color: "#090a09",
    categories: ["business", "design", "productivity"],
    icons: [
      {
        src: "/brand/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/brand/app-icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
