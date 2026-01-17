import { z } from "zod";

const STORAGE_KEY = "todo_app_data_v2";

const TodoSchema = z.object({
  id: z.number(),
  text: z.string().min(1, "Todo text cannot be empty"),
  completed: z.boolean().default(false),
  createdAt: z.number(),
});

const TodoListSchema = z.array(TodoSchema);

export const TodoService = {
  loadTodos: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];

      const parsed = JSON.parse(stored);
      // Validate schema to prevent data corruption
      const result = TodoListSchema.safeParse(parsed);

      if (!result.success) {
        console.error(
          "Data corruption detected, resetting storage:",
          result.error,
        );
        localStorage.removeItem(STORAGE_KEY);
        return [];
      }

      return result.data;
    } catch (error) {
      console.error("Failed to load todos:", error);
      return [];
    }
  },

  saveTodos: (todos) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error("Failed to save todos:", error);
    }
  },
};
