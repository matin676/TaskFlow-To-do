import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleSubtask, removeSubtask, addSubtask } from "../model/todoSlice";
import { cn } from "../../../shared/lib/cn";
import { CheckCircle, Circle, X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function SubtaskList({ todo }) {
  const dispatch = useDispatch();
  const [newSubtask, setNewSubtask] = useState("");

  const handleAddSubtask = (e) => {
    if (e.key === "Enter" && newSubtask.trim()) {
      dispatch(addSubtask({ todoId: todo.id, text: newSubtask }));
      setNewSubtask("");
    }
  };

  return (
    <div className="mt-3 pl-2 w-full">
      <div className="pl-4 border-l-2 border-border/50 space-y-2">
        <AnimatePresence mode="popLayout">
          {todo.subtasks?.map((subtask) => (
            <motion.div
              key={subtask.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center gap-3 group/sub"
            >
              <button
                onClick={() =>
                  dispatch(
                    toggleSubtask({ todoId: todo.id, subtaskId: subtask.id }),
                  )
                }
                className={cn(
                  "text-muted-foreground hover:text-primary transition-colors",
                  subtask.completed && "text-primary/70",
                )}
              >
                {subtask.completed ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Circle className="w-4 h-4" />
                )}
              </button>
              <span
                className={cn(
                  "text-sm flex-1 truncate transition-all",
                  subtask.completed &&
                    "line-through text-muted-foreground decoration-slate-400/50",
                )}
              >
                {subtask.text}
              </span>
              <button
                onClick={() =>
                  dispatch(
                    removeSubtask({ todoId: todo.id, subtaskId: subtask.id }),
                  )
                }
                className="opacity-0 group-hover/sub:opacity-100 p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-all"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Add Subtask Input */}
        <div className="flex items-center gap-2 pt-2">
          <Plus className="w-4 h-4 text-muted-foreground/50" />
          <input
            type="text"
            placeholder="Add subtask..."
            value={newSubtask}
            onChange={(e) => setNewSubtask(e.target.value)}
            onKeyDown={handleAddSubtask}
            className="bg-transparent border-none text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-0 w-full p-0"
          />
        </div>
      </div>
    </div>
  );
}
