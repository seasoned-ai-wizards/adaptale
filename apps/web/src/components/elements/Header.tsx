import Link from "next/link";
import Image from "next/image";
import { Bell, Settings } from "lucide-react";
import { auth } from "~/server/auth";

export async function Header() {
  const session = await auth();
  
  return (
    <header className="w-full border-b border-gray-200">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Link href="/">
            <Image src="/adaptale.png" width={120} height={40} alt="Adaptale" />
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
  );
}