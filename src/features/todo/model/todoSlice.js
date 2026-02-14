import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

/**
 * Todo Slice
 *
 * This slice manages the global state for todos using Redux Toolkit's EntityAdapter.
 * It leverages createAsyncThunk for handling asynchronous side effects (API calls),
 * ensuring the UI stays responsive while data is being persisted.
 */
import { TodoService } from "../api/TodoService";

export const todoAdapter = createEntityAdapter({
  selectId: (todo) => todo.id,
  sortComparer: (a, b) => b.createdAt - a.createdAt,
});

// Thunks
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  return await TodoService.getTodos();
});

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (initialData) => {
    // initialData: { text, priority, tags }
    return await TodoService.createTodo(initialData);
  },
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, changes }) => {
    return await TodoService.updateTodo(id, changes);
  },
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await TodoService.deleteTodo(id);
  return id;
});

// Composite Thunks (Logic involving previous state)
export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async (id, { getState, dispatch }) => {
    const state = getState();
    const todo = state.todos.entities[id];
    if (todo) {
      return await dispatch(
        updateTodo({ id, changes: { completed: !todo.completed } }),
      ).unwrap();
    }
  },
);

export const addSubtask = createAsyncThunk(
  "todos/addSubtask",
  async ({ todoId, text }, { getState, dispatch }) => {
    const state = getState();
    const todo = state.todos.entities[todoId];
    if (todo) {
      const newSubtask = { id: Date.now(), text, completed: false };
      const updatedSubtasks = [...(todo.subtasks || []), newSubtask];
      return await dispatch(
        updateTodo({ id: todoId, changes: { subtasks: updatedSubtasks } }),
      ).unwrap();
    }
  },
);

export const toggleSubtask = createAsyncThunk(
  "todos/toggleSubtask",
  async ({ todoId, subtaskId }, { getState, dispatch }) => {
    const state = getState();
    const todo = state.todos.entities[todoId];
    if (todo && todo.subtasks) {
      const updatedSubtasks = todo.subtasks.map((s) =>
        s.id === subtaskId ? { ...s, completed: !s.completed } : s,
      );
      return await dispatch(
        updateTodo({ id: todoId, changes: { subtasks: updatedSubtasks } }),
      ).unwrap();
    }
  },
);

export const removeSubtask = createAsyncThunk(
  "todos/removeSubtask",
  async ({ todoId, subtaskId }, { getState, dispatch }) => {
    const state = getState();
    const todo = state.todos.entities[todoId];
    if (todo && todo.subtasks) {
      const updatedSubtasks = todo.subtasks.filter((s) => s.id !== subtaskId);
      return await dispatch(
        updateTodo({ id: todoId, changes: { subtasks: updatedSubtasks } }),
      ).unwrap();
    }
  },
);

const todoSlice = createSlice({
  name: "todos",
  initialState: todoAdapter.getInitialState({
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        todoAdapter.setAll(state, action.payload);
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Add
      .addCase(addTodo.fulfilled, (state, action) => {
        todoAdapter.addOne(state, action.payload);
      })
      // Update (handled by updateTodo generic, and composite thunks eventually call updateTodo)
      .addCase(updateTodo.fulfilled, (state, action) => {
        todoAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload,
        });
      })
      // Delete
      .addCase(deleteTodo.fulfilled, (state, action) => {
        todoAdapter.removeOne(state, action.payload);
      });
  },
});

export const { selectAll: selectAllTodos, selectById: selectTodoById } =
  todoAdapter.getSelectors((state) => state.todos);

export default todoSlice.reducer;
