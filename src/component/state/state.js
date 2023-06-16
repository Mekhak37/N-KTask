import Employee from "../menu/Employee/Employee";
import Tasks from "../menu/tasks/tasks";

export const menuState = [
  { id: Math.random(), name: "Employees", path: "/", element: <Employee /> },
  { id: Math.random(), name: "Tasks", path: "/tasks", element: <Tasks /> },
];
