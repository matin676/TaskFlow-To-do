import React from "react";
import { cn } from "../../utils/cn";

export function FilterBar({ filter, setFilter }) {
  const filters = ["all", "active", "completed"];

  return (
    <div className="flex p-1 bg-muted/50 rounded-lg mb-6">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={cn(
            "flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all capitalize",
            filter === f
              ? "bg-background text-primary shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
