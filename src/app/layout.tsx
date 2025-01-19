import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coolset Assignment",
  description: "Coolset Assignment by Artem Gavrysh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
