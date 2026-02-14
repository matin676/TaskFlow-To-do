import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllTodos, fetchTodos } from "../model/todoSlice";
import { TodoItem } from "./TodoItem";
import { FilterBar } from "./FilterBar";
import { ProgressBar } from "./ProgressBar";
import { motion, AnimatePresence } from "framer-motion";
import { Layers } from "lucide-react";

export function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector(selectAllTodos);
  const status = useSelector((state) => state.todos.status);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6">
        {/* Stats & Filter Group */}
        <div className="bg-card/50 backdrop-blur-sm border rounded-2xl p-6 shadow-sm">
          <ProgressBar total={todos.length} completed={completedCount} />
          <FilterBar filter={filter} setFilter={setFilter} />
        </div>

        {/* List */}
        <div className="space-y-2 min-h-[300px]">
          {status === "loading" && todos.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-muted-foreground gap-3">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium">Loading your tasks...</p>
            </div>
          ) : filteredTodos.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-48 text-muted-foreground gap-4 border-2 border-dashed border-border/50 rounded-2xl bg-secondary/20"
            >
              <div className="p-4 bg-background rounded-full shadow-sm">
                <Layers className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">
                  No tasks found
                </p>
                <p className="text-xs text-muted-foreground/80 mt-1">
                  Get started by adding a new task above.
                </p>
              </div>
            </motion.div>
          ) : (
            <ul className="space-y-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredTodos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
