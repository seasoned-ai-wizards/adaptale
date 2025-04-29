import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter, Paytone_One } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { Bell, Settings } from "lucide-react";

import { TRPCReactProvider } from "~/trpc/react";
import { auth } from "~/server/auth";

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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  
  return (
    <html lang="en" className={`${inter.variable} ${paytoneOne.variable}`}>
      <body className="min-h-screen bg-gray-50 font-sans">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white">
          <div className="container mx-auto flex items-center justify-between p-4">
            <div className="flex items-center">
              <Link href="/">
                <Image src="/adaptable.png" width={120} height={40} alt="Adaptale" />
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <button className="rounded-full bg-gray-100 p-2">
                <Bell className="h-5 w-5" />
              </button>
              <button className="rounded-full bg-gray-100 p-2">
                <Settings className="h-5 w-5" />
              </button>
              {session?.user && (
                <div className="h-10 w-10 overflow-hidden rounded-full">
                  <Image 
                    src={session.user.image ?? "https://via.placeholder.com/40"} 
                    width={40} 
                    height={40} 
                    alt={session.user.name ?? "User"} 
                  />
                </div>
              )}
            </div>
          </div>
        </header>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
