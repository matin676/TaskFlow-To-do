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
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
        createdAt: Date.now(),
      };
      todoAdapter.addOne(state, newTodo);
      // Side effect for instant saving (optimistic)
      TodoService.saveTodos(Object.values(state.entities));
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
  },
  extraReducers: (builder) => {
    builder.addCase(loadTodos.fulfilled, (state, action) => {
      todoAdapter.setAll(state, action.payload);
      state.status = "succeeded";
    });
  },
});

export const { addTodo, removeTodo, toggleTodo, updateTodo } =
  todoSlice.actions;

export const { selectAll: selectAllTodos, selectById: selectTodoById } =
  todoAdapter.getSelectors((state) => state.todos);

export default todoSlice.reducer;
