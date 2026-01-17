import React from "react";
import { cn } from "../../utils/cn";

export function ProgressBar({ total, completed }) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="mb-8">
      <div className="flex justify-between text-sm mb-2 text-muted-foreground font-medium">
        <span>Progress</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
