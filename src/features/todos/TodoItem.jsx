import React, { useState, useRef, useEffect, forwardRef } from "react";
import {
  Trash2,
  CheckCircle,
  Circle,
  Edit2,
  X,
  Check,
  ListTree,
  Plus,
} from "lucide-react";
import { useDispatch } from "react-redux";
import {
  removeTodo,
  toggleTodo,
  updateTodo,
  addSubtask,
  toggleSubtask,
  removeSubtask,
} from "./todoSlice";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

export const TodoItem = forwardRef(({ todo }, ref) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [newSubtask, setNewSubtask] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleUpdate = () => {
    if (editText.trim()) {
      dispatch(updateTodo({ id: todo.id, text: editText }));
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

  const handleAddSubtask = (e) => {
    if (e.key === "Enter" && newSubtask.trim()) {
      dispatch(addSubtask({ todoId: todo.id, text: newSubtask }));
      setNewSubtask("");
    }
  };

  const priorityColors = {
    low: "bg-blue-50 text-blue-700 border-blue-200",
    medium: "bg-amber-50 text-amber-700 border-amber-200",
    high: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <motion.li
      ref={ref}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className={cn(
        "group flex flex-col p-3 mb-3 bg-card border rounded-xl shadow-sm transition-all hover:shadow-md",
        todo.completed && !isEditing && "opacity-60 bg-muted/40",
      )}
    >
      <div className="flex items-start justify-between w-full">
        <div className="flex items-start gap-3 flex-1 overflow-hidden mr-2">
          <button
            onClick={() => dispatch(toggleTodo(todo.id))}
            className={cn(
              "mt-0.5 text-muted-foreground transition-colors hover:text-primary shrink-0",
              todo.completed && "text-primary",
            )}
          >
            {todo.completed ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </button>

          {isEditing ? (
            <div className="flex-1 flex gap-2">
              <Input
                ref={inputRef}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-8"
              />
            </div>
          ) : (
            <div className="flex flex-col items-start overflow-hidden w-full">
              <span
                onDoubleClick={() => setIsEditing(true)}
                className={cn(
                  "font-medium truncate transition-all decoration-2 cursor-text select-none text-base",
                  todo.completed && "line-through text-muted-foreground",
                )}
              >
                {todo.text}
              </span>

              <div className="flex flex-wrap gap-2 mt-1.5 items-center">
                {todo.priority && (
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded border uppercase tracking-wider font-semibold",
                      priorityColors[todo.priority],
                    )}
                  >
                    {todo.priority}
                  </span>
                )}
                {todo.tags &&
                  todo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded border"
                    >
                      #{tag}
                    </span>
                  ))}
                {(todo.subtasks?.length > 0 || showSubtasks) && (
                  <button
                    onClick={() => setShowSubtasks(!showSubtasks)}
                    className="text-[10px] text-muted-foreground hover:text-primary flex items-center gap-1 ml-auto sm:ml-0"
                  >
                    <ListTree className="w-3 h-3" />
                    {todo.subtasks?.filter((s) => s.completed).length}/
                    {todo.subtasks?.length}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-0.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          {isEditing ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleUpdate}
                className="h-9 w-9 md:h-7 md:w-7 text-green-600 hover:text-green-700 hover:bg-green-50"
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsEditing(false);
                  setEditText(todo.text);
                }}
                className="h-9 w-9 md:h-7 md:w-7 text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <X className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSubtasks(!showSubtasks)}
                className="h-9 w-9 md:h-7 md:w-7 text-muted-foreground hover:text-primary"
                title={showSubtasks ? "Hide Subtasks" : "Show Subtasks"}
              >
                <ListTree className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(true)}
                className="h-9 w-9 md:h-7 md:w-7 text-muted-foreground hover:text-primary"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => dispatch(removeTodo(todo.id))}
                className="h-9 w-9 md:h-7 md:w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Subtasks Section */}
      {showSubtasks && (
        <div className="mt-2 pl-2 w-full animate-in slide-in-from-top-1 fade-in-0 duration-200">
          <div className="pl-6 border-l-2 border-border/40 space-y-2 py-1">
            {todo.subtasks &&
              todo.subtasks.map((subtask) => (
                <div
                  key={subtask.id}
                  className="flex items-center gap-2 group/sub relative"
                >
                  <button
                    onClick={() =>
                      dispatch(
                        toggleSubtask({
                          todoId: todo.id,
                          subtaskId: subtask.id,
                        }),
                      )
                    }
                    className={cn(
                      "text-muted-foreground hover:text-primary transition-colors",
                      subtask.completed && "text-primary/70",
                    )}
                  >
                    {subtask.completed ? (
                      <CheckCircle className="w-3.5 h-3.5" />
                    ) : (
                      <Circle className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <span
                    className={cn(
                      "text-sm flex-1 truncate",
                      subtask.completed && "line-through text-muted-foreground",
                    )}
                  >
                    {subtask.text}
                  </span>
                  <button
                    onClick={() =>
                      dispatch(
                        removeSubtask({
                          todoId: todo.id,
                          subtaskId: subtask.id,
                        }),
                      )
                    }
                    className="opacity-0 group-hover/sub:opacity-100 text-muted-foreground hover:text-destructive transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

            <div className="flex items-center gap-2 pt-1">
              <Plus className="w-3.5 h-3.5 text-muted-foreground/70" />
              <input
                type="text"
                placeholder="Add subtask..."
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                onKeyDown={handleAddSubtask}
                className="bg-transparent border-none text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-0 w-full p-0 h-auto"
              />
            </div>
          </div>
        </div>
      )}
    </motion.li>
  );
});

TodoItem.displayName = "TodoItem";
