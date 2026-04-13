import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

/* ============================= */
/* 🎨 FONT SYSTEM */
/* ============================= */
const headingFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

/* ============================= */
/* 🌐 METADATA (SEO + WA PREVIEW) */
/* ============================= */
export const metadata: Metadata = {
  metadataBase: new URL("https://inv-alfalah.vercel.app"),

  title: {
    default: "Undangan Haflah Al-Falah",
    template: "%s | Undangan Digital",
  },

  description:
    "Undangan Haflah Attasyakur Ponpes Al-Falah Assholihaat. Kami mengundang Anda untuk hadir.",

  keywords: [
    "undangan digital",
    "haflah",
    "pondok pesantren",
    "undangan islami",
    "undangan online",
  ],

  authors: [{ name: "Al-Falah" }],
  creator: "Al-Falah",

  openGraph: {
    title: "Undangan Haflah Al-Falah",
    description:
      "Kami mengundang Anda untuk hadir dalam Haflah Attasyakur Ponpes Al-Falah Assholihaat.",
    url: "https://inv-alfalah.vercel.app",
    siteName: "Undangan Digital",
    images: [
      {
        url: "/cover.jpg", // wajib ada di /public
        width: 1200,
        height: 630,
        alt: "Undangan Haflah Al-Falah",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Undangan Haflah Al-Falah",
    description:
      "Undangan Haflah Attasyakur Ponpes Al-Falah Assholihaat",
    images: ["/cover.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

/* ============================= */
/* 🧱 ROOT LAYOUT */
/* ============================= */
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
      <body className="min-h-screen bg-background text-foreground antialiased">

        {/* 🌿 MAIN WRAPPER */}
        <div className="relative z-10">
          {children}
        </div>

      </body>
    </html>
  );
}