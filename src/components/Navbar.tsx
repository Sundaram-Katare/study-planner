"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import ThemeToggle from "./ui/ThemeToggle";

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg border-b-1 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">

          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow">
                <span className="text-blue-600 font-bold text-xl">P</span>
              </div>
              <span className="text-white font-semibold text-xl">Planix</span>
            </div>
          </Link>

          <div className="flex items-center gap-6">

            <div className="ml-2">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-9 h-9 ring-2 ring-blue-500/30 hover:ring-blue-500 transition",
                  },
                }}
                afterSignOutUrl="/"
              />
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}
