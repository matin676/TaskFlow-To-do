import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllTodos, loadTodos } from "./todoSlice";
import { TodoItem } from "./TodoItem";
import { FilterBar } from "./FilterBar";
import { ProgressBar } from "./ProgressBar";
import { AnimatePresence } from "framer-motion";

export function TodoList() {
  const todos = useSelector(selectAllTodos);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const completedCount = todos.filter((t) => t.completed).length;

  if (todos.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No tasks yet. Start by adding one above!</p>
      </div>
    );
  }

  return (
    <div>
      <ProgressBar total={todos.length} completed={completedCount} />
      <FilterBar filter={filter} setFilter={setFilter} />
      <ul className="space-y-2">
        <AnimatePresence mode="popLayout">
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </AnimatePresence>
      </ul>
      {filteredTodos.length === 0 && (
        <div className="text-center py-12 text-muted-foreground opacity-50">
          <p>No {filter} items found.</p>
        </div>
      )}
    </div>
  );
}
