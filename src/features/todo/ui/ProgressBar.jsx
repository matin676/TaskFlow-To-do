import React from "react";
import { cn } from "../../../shared/lib/cn";
import { motion } from "framer-motion";

export function ProgressBar({ total, completed }) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-end mb-2 px-1">
        <div>
          <h3 className="text-sm font-semibold text-foreground/80 tracking-tight">
            Your Progress
          </h3>
          <p className="text-xs text-muted-foreground">
            {completed} of {total} tasks completed
          </p>
        </div>
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">
          {percentage}%
        </span>
      </div>
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary to-indigo-400 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.3)]"
        />
      </div>
    </div>
  );
}
