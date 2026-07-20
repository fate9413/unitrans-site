import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Unitrans & Uniagent Varna",
    short_name: "Unitrans",
    description:
      "Ship agency, freight forwarding and customs brokerage in Bulgarian ports since 1993.",
    start_url: "/en",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#0b0d12",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
