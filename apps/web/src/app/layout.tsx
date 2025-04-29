import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter, Paytone_One } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

// Configure the Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Configure the Paytone One font
const paytoneOne = Paytone_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-paytone",
});

export const metadata: Metadata = {
  title: "Adaptale - Create Presentations",
  description: "Create and manage interactive presentations",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${paytoneOne.variable}`}>
      <body className="min-h-screen bg-gray-50 font-sans">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
