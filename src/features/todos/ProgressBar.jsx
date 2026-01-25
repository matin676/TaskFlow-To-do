import React from "react";
import { cn } from "../../utils/cn";

export function ProgressBar({ total, completed }) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="mb-8 p-4 bg-card rounded-2xl border shadow-sm ring-1 ring-black/5">
      <div className="flex justify-between items-end mb-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Task Progress
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {completed} of {total} completed
          </p>
        </div>
        <span className="text-2xl font-bold text-primary tracking-tight">
          {percentage}%
        </span>
      </div>
      <div className="h-2.5 w-full bg-secondary/50 rounded-full overflow-hidden p-[2px]">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-700 ease-out shadow-sm"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
