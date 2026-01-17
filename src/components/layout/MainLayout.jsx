import React from "react";
import { Header } from "./Header";

export function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header />
      <main className="container max-w-screen-md mx-auto pt-8 px-4">
        {children}
      </main>
    </div>
  );
}
