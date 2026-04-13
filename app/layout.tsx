import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

/* 🎨 FONT PREMIUM */
const headingFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

/* 🌐 METADATA (PENTING BUAT SHARE LINK) */
export const metadata: Metadata = {
  title: "Undangan Haflah Al-Falah",
  description: "Undangan Haflah Attasyakur Ponpes Al-Falah Assholihaat",

  openGraph: {
    title: "Undangan Haflah Al-Falah",
    description: "Kami mengundang Anda untuk hadir dalam Haflah Attasyakur",
    url: "https://yourdomain.com",
    siteName: "Undangan Digital",
    images: [
      {
        url: "/cover.jpg", // 👉 nanti bisa kamu ganti
        width: 1200,
        height: 630,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

/* 🧱 ROOT LAYOUT */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${headingFont.variable} ${bodyFont.variable} h-full`}
    >
      <body className="min-h-full bg-background text-foreground font-sans antialiased">
        
        {/* 🌿 WRAPPER */}
        <div className="relative z-10">
          {children}
        </div>

      </body>
    </html>
  );
}