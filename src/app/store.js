import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../features/employee/employee";
import taskReducer from "../features/task/task";
import logger from "redux-logger";
export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    task: taskReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
