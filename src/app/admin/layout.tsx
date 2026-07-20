import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Админ панел — Unitrans & Uniagent",
  robots: { index: false, follow: false },
  icons: { icon: "/icon.svg" },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg">
      <body>{children}</body>
    </html>
  );
}
