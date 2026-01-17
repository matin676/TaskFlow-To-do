import React, { useState, useRef, useEffect, forwardRef } from "react";
import { Trash2, CheckCircle, Circle, Edit2, X, Check } from "lucide-react";
import { useDispatch } from "react-redux";
import { removeTodo, toggleTodo, updateTodo } from "./todoSlice";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

export const TodoItem = forwardRef(({ todo }, ref) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
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

  return (
    <motion.li
      ref={ref}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className={cn(
        "group flex items-center justify-between p-4 mb-3 bg-card border rounded-lg shadow-sm transition-all hover:shadow-md",
        todo.completed && !isEditing && "opacity-60 bg-muted/50",
      )}
    >
      <div className="flex items-center gap-3 flex-1 overflow-hidden mr-2">
        <button
          onClick={() => dispatch(toggleTodo(todo.id))}
          className={cn(
            "text-muted-foreground transition-colors hover:text-primary shrink-0",
            todo.completed && "text-primary",
          )}
        >
          {todo.completed ? (
            <CheckCircle className="w-6 h-6" />
          ) : (
            <Circle className="w-6 h-6" />
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
          <span
            onDoubleClick={() => setIsEditing(true)}
            className={cn(
              "font-medium truncate transition-all decoration-2 cursor-text select-none",
              todo.completed && "line-through text-muted-foreground",
            )}
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        {isEditing ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleUpdate}
              className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
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
              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <X className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              className="h-8 w-8 text-muted-foreground hover:text-primary"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(removeTodo(todo.id))}
              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    </motion.li>
  );
});

TodoItem.displayName = "TodoItem";
