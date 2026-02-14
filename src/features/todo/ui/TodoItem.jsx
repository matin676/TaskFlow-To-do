import React, { useState, useRef, useEffect, forwardRef } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo, updateTodo } from "../model/todoSlice";
import { cn } from "../../../shared/lib/cn";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../../shared/ui/Button";
import { Input } from "../../../shared/ui/Input";
import {
  CheckCircle,
  Circle,
  Edit2,
  Trash2,
  ListTree,
  Check,
  X,
} from "lucide-react";
import { SubtaskList } from "./SubtaskList";

export const TodoItem = forwardRef(({ todo }, ref) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [showSubtasks, setShowSubtasks] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleUpdate = () => {
    if (editText.trim()) {
      dispatch(updateTodo({ id: todo.id, changes: { text: editText } }));
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleUpdate();
    if (e.key === "Escape") {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const priorityColors = {
    low: "bg-slate-100 text-slate-600 border-slate-200",
    medium: "bg-amber-50 text-amber-600 border-amber-200",
    high: "bg-rose-50 text-rose-600 border-rose-200",
  };

  return (
    <motion.li
      ref={ref}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className={cn(
        "group flex flex-col p-4 mb-3 bg-card border rounded-xl shadow-sm hover:shadow-md transition-all duration-300",
        todo.completed && !isEditing && "opacity-75 bg-muted/30",
      )}
    >
      <div className="flex items-start justify-between w-full gap-4">
        {/* Checkbox & Content */}
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <button
            onClick={() => dispatch(toggleTodo(todo.id))}
            className={cn(
              "mt-1 text-muted-foreground transition-all duration-300 hover:text-primary shrink-0 hover:scale-110 active:scale-90",
              todo.completed && "text-primary",
            )}
          >
            {todo.completed ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              <Circle className="w-6 h-6" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  ref={inputRef}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="h-9 font-medium"
                />
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                <span
                  onDoubleClick={() => setIsEditing(true)}
                  className={cn(
                    "font-medium text-lg leading-tight transition-all cursor-pointer select-none",
                    todo.completed &&
                      "line-through text-muted-foreground decoration-slate-300 decoration-2",
                  )}
                >
                  {todo.text}
                </span>

                {/* Tags & Priority */}
                <div className="flex flex-wrap gap-2 items-center">
                  {todo.priority && (
                    <span
                      className={cn(
                        "text-[10px] px-2 py-0.5 rounded-full border font-semibold tracking-wide uppercase",
                        priorityColors[todo.priority],
                      )}
                    >
                      {todo.priority}
                    </span>
                  )}
                  {todo.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
          {isEditing ? (
            <>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-green-600 hover:bg-green-50"
                onClick={handleUpdate}
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-red-500 hover:bg-red-50"
                onClick={() => {
                  setIsEditing(false);
                  setEditText(todo.text);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <>
              <Button
                size="icon"
                variant="ghost"
                className={cn(
                  "h-8 w-8 text-muted-foreground hover:text-primary",
                  showSubtasks && "text-primary bg-primary/10",
                )}
                onClick={() => setShowSubtasks(!showSubtasks)}
              >
                <ListTree className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-muted-foreground hover:text-primary"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                onClick={() => dispatch(deleteTodo(todo.id))}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showSubtasks && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <SubtaskList todo={todo} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
});

TodoItem.displayName = "TodoItem";
