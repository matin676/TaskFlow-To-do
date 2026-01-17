import React from "react";
import { LayoutList } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-md mx-auto items-center">
        <div className="mr-4 flex gap-2 font-bold items-center">
          <LayoutList className="w-5 h-5 text-primary" />
          <span>TaskFlow</span>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            {/* Future Navigation Items */}
          </nav>
        </div>
      </div>
    </header>
  );
}
