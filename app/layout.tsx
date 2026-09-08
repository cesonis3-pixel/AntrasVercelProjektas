import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kalnų draugai | Slidinėjimo kurortų bendruomenė",
  description:
    "Vieta atrasti slidinėjimo kurortus ir susitikti kalnus mėgstančiai bendruomenei.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="lt">
      <body>{children}</body>
    </html>
  );
}
