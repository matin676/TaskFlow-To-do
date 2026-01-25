import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { TodoService } from "../../services/TodoService";

export const todoAdapter = createEntityAdapter({
  selectId: (todo) => todo.id,
  sortComparer: (a, b) => b.createdAt - a.createdAt, // Newest first
});

export const loadTodos = createAsyncThunk("todos/load", async () => {
  return TodoService.loadTodos();
});

const todoSlice = createSlice({
  name: "todos",
  initialState: todoAdapter.getInitialState({
    status: "idle", // idle | loading | succeeded | failed
  }),
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        todoAdapter.addOne(state, action.payload);
        TodoService.saveTodos(Object.values(state.entities));
      },
      prepare: (text, priority = "medium", tags = []) => {
        return {
          payload: {
            id: Date.now(),
            text,
            completed: false,
            createdAt: Date.now(),
            priority, // 'low', 'medium', 'high'
            tags, // array of strings
            subtasks: [], // array of { id, text, completed }
          },
        };
      },
    },
    removeTodo: (state, action) => {
      todoAdapter.removeOne(state, action.payload);
      TodoService.saveTodos(Object.values(state.entities));
    },
    toggleTodo: (state, action) => {
      const todo = state.entities[action.payload];
      if (todo) {
        todo.completed = !todo.completed;
        TodoService.saveTodos(Object.values(state.entities));
      }
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.entities[id];
      if (todo) {
        todo.text = text;
        TodoService.saveTodos(Object.values(state.entities));
      }
    },
    // New Feature Reducers
    updatePriority: (state, action) => {
      const { id, priority } = action.payload;
      const todo = state.entities[id];
      if (todo) {
        todo.priority = priority;
        TodoService.saveTodos(Object.values(state.entities));
      }
    },
    addTag: (state, action) => {
      const { id, tag } = action.payload;
      const todo = state.entities[id];
      if (todo) {
        if (!todo.tags) todo.tags = [];
        if (!todo.tags.includes(tag)) {
          todo.tags.push(tag);
          TodoService.saveTodos(Object.values(state.entities));
        }
      }
    },
    removeTag: (state, action) => {
      const { id, tag } = action.payload;
      const todo = state.entities[id];
      if (todo) {
        if (todo.tags) {
          todo.tags = todo.tags.filter((t) => t !== tag);
          TodoService.saveTodos(Object.values(state.entities));
        }
      }
    },
    addSubtask: (state, action) => {
      const { todoId, text } = action.payload;
      const todo = state.entities[todoId];
      if (todo) {
        if (!todo.subtasks) todo.subtasks = [];
        todo.subtasks.push({
          id: Date.now() + Math.random(), // Simple ID generation
          text,
          completed: false,
        });
        TodoService.saveTodos(Object.values(state.entities));
      }
    },
    toggleSubtask: (state, action) => {
      const { todoId, subtaskId } = action.payload;
      const todo = state.entities[todoId];
      if (todo && todo.subtasks) {
        const subtask = todo.subtasks.find((s) => s.id === subtaskId);
        if (subtask) {
          subtask.completed = !subtask.completed;
          TodoService.saveTodos(Object.values(state.entities));
        }
      }
    },
    removeSubtask: (state, action) => {
      const { todoId, subtaskId } = action.payload;
      const todo = state.entities[todoId];
      if (todo && todo.subtasks) {
        todo.subtasks = todo.subtasks.filter((s) => s.id !== subtaskId);
        TodoService.saveTodos(Object.values(state.entities));
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadTodos.fulfilled, (state, action) => {
      // Data Migration Logic (Ensure all fields exist)
      const todos = action.payload.map((todo) => ({
        ...todo,
        priority: todo.priority || "medium",
        tags: todo.tags || [],
        subtasks: todo.subtasks || [],
      }));
      todoAdapter.setAll(state, todos);
      state.status = "succeeded";
    });
  },
});

export const {
  addTodo,
  removeTodo,
  toggleTodo,
  updateTodo,
  updatePriority,
  addTag,
  removeTag,
  addSubtask,
  toggleSubtask,
  removeSubtask,
} = todoSlice.actions;

export const { selectAll: selectAllTodos, selectById: selectTodoById } =
  todoAdapter.getSelectors((state) => state.todos);

export default todoSlice.reducer;
