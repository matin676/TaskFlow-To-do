import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/model/todoSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});
