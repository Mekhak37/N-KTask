import { configureStore } from "@reduxjs/toolkit";
import toDoReducer from "../features/employee/employee";
import taskReducer from "../features/task/task";
import logger from "redux-logger";
export const store = configureStore({
  reducer: {
    employee: toDoReducer,
    task: taskReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
