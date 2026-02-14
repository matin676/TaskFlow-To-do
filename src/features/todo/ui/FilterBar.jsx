import React from "react";
import { cn } from "../../../shared/lib/cn";
import { motion } from "framer-motion";

export function FilterBar({ filter, setFilter }) {
  const filters = ["all", "active", "completed"];

  return (
    <div className="flex justify-center mb-6">
      <div className="flex p-1 bg-secondary/60 backdrop-blur-sm rounded-xl ring-1 ring-black/5">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "relative px-4 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 capitalize min-w-[80px]",
              filter === f
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {filter === f && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-background shadow-sm rounded-lg ring-1 ring-black/5 z-0"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{f}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
