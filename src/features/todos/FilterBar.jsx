import React from "react";
import { cn } from "../../utils/cn";

export function FilterBar({ filter, setFilter }) {
  const filters = ["all", "active", "completed"];

  return (
    <div className="flex p-1 bg-secondary/40 rounded-xl mb-6 ring-1 ring-black/5 mx-2 overflow-x-auto no-scrollbar">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={cn(
            "flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all capitalize duration-200",
            filter === f
              ? "bg-card text-foreground shadow-sm ring-1 ring-black/5"
              : "text-muted-foreground hover:text-foreground hover:bg-background/50",
          )}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
