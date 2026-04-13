import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

/* 🎨 FONT */
const headingFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

/* 🌐 METADATA */
export const metadata: Metadata = {
  metadataBase: new URL("https://inv-alfalah.vercel.app"),

  title: "Undangan Haflah Al-Falah",
  description: "Undangan Haflah Attasyakur Ponpes Al-Falah Assholihaat",

  openGraph: {
    title: "Undangan Haflah Al-Falah",
    description: "Kami mengundang Anda untuk hadir",
    url: "https://inv-alfalah.vercel.app",
    siteName: "Undangan Digital",
    images: [
      {
        url: "/cover.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

/* 🧱 LAYOUT */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${headingFont.variable} ${bodyFont.variable}`}
    >
      <body className="bg-background text-foreground antialiased">

        {/* 🌿 GLOBAL WRAPPER */}
        <div className="relative min-h-screen overflow-hidden">

          {/* subtle overlay gradient */}
          <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-transparent to-white/40" />

          {/* CONTENT */}
          <div className="relative z-10">
            {children}
          </div>

        </div>

      </body>
    </html>
  );
}