import { z } from "zod";

const STORAGE_KEY = "todo_app_data_v2";

const SubtaskSchema = z.object({
  id: z.number().or(z.string()),
  text: z.string(),
  completed: z.boolean().default(false),
});

const TodoSchema = z.object({
  id: z.number(),
  text: z.string().min(1, "Todo text cannot be empty"),
  completed: z.boolean().default(false),
  createdAt: z.number(),
  priority: z.enum(["low", "medium", "high"]).default("medium").optional(),
  tags: z.array(z.string()).default([]).optional(),
  subtasks: z.array(SubtaskSchema).default([]).optional(),
});

const TodoListSchema = z.array(TodoSchema);

// Simulate network delay to mimic real-world API latency
// This helps in testing loading states and optimistic updates in the UI
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Internal Helper for Sync Access (Database Logic)
const db = {
  read: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      const result = TodoListSchema.safeParse(parsed);

      if (!result.success) {
        console.error("Data corruption:", result.error);
        return []; // In a real app, strict handling
      }

      // Migration/Defaults
      return result.data.map((todo) => ({
        ...todo,
        priority: todo.priority || "medium",
        tags: todo.tags || [],
        subtasks: todo.subtasks || [],
      }));
    } catch (e) {
      console.error(e);
      return [];
    }
  },
  write: (todos) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (e) {
      console.error(e);
    }
  },
};

export const TodoService = {
  getTodos: async () => {
    await delay(400);
    return db.read();
  },

  createTodo: async (todoData) => {
    await delay(300);
    const todos = db.read();

    // Server-side logic simulation (ID generation, etc.)
    const newTodo = {
      id: Date.now(),
      createdAt: Date.now(),
      completed: false,
      subtasks: [],
      tags: [],
      priority: "medium",
      ...todoData, // Override defaults with provided data
    };

    // Sort logic usually happens on read, but let's push to top
    // However, the adapter sorts by createdAt usually.
    const newTodos = [newTodo, ...todos];
    db.write(newTodos);
    return newTodo;
  },

  updateTodo: async (id, updates) => {
    await delay(200);
    const todos = db.read();
    let updatedItem = null;

    const newTodos = todos.map((t) => {
      if (t.id === id) {
        updatedItem = { ...t, ...updates };
        return updatedItem;
      }
      return t;
    });

    if (!updatedItem) throw new Error("Todo not found");

    db.write(newTodos);
    return updatedItem;
  },

  deleteTodo: async (id) => {
    await delay(200);
    const todos = db.read();
    const newTodos = todos.filter((t) => t.id !== id);
    db.write(newTodos);
    return id;
  },
};
