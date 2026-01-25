import { z } from "zod";

const STORAGE_KEY = "todo_app_data_v2";

const SubtaskSchema = z.object({
  id: z.number().or(z.string()), // Accept both number (old timestamp) or string (if needed later)
  text: z.string(),
  completed: z.boolean().default(false),
});

const TodoSchema = z.object({
  id: z.number(),
  text: z.string().min(1, "Todo text cannot be empty"),
  completed: z.boolean().default(false),
  createdAt: z.number(),
  // New Fields - Optional for backward compatibility during parsing
  priority: z.enum(["low", "medium", "high"]).default("medium").optional(),
  tags: z.array(z.string()).default([]).optional(),
  subtasks: z.array(SubtaskSchema).default([]).optional(),
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
          "Data corruption detected, attempting partial recovery or resetting:",
          result.error,
        );
        // Fallback: If partial failure, we could try to rescue valid items, but for now safe reset
        // To be safer, we could return parsed if it's an array even if strict schema fails,
        // but strict validation is safer.
        // Let's try to map it to ensure defaults are applied if schema fails on missing optional fields:
        if (Array.isArray(parsed)) {
          // Manual migration / sanitization attempt
          return parsed.map((item) => ({
            ...item,
            priority: item.priority || "medium",
            tags: Array.isArray(item.tags) ? item.tags : [],
            subtasks: Array.isArray(item.subtasks) ? item.subtasks : [],
          }));
        }

        console.warn("Resetting storage due to fatal schema mismatch");
        return [];
      }

      // Ensure defaults are applied even if Zod passes (Zod usually handles defaults if key is missing/undefined, but not if null)
      return result.data.map((todo) => ({
        ...todo,
        priority: todo.priority || "medium",
        tags: todo.tags || [],
        subtasks: todo.subtasks || [],
      }));
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
