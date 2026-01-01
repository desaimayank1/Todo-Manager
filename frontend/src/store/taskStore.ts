import { create } from "zustand";
import type { Task, User } from "../types/task";

interface UserList {
    id: string;
    name: string;
    email: string;
}

interface TaskState {
  user: User | null;
  tasks: Task[];
  assignedTasks: Task[];
  userList:UserList[];

  setUser: (u: User | null) => void;
  setUserList:(u:UserList[])=>void;
  setTasks: (t: Task[]) => void;
  addTask: (t: Task) => void;
  updateTask: (t: Task) => void;
  deleteTask: (id: string) => void;
}

// const sampleUser: User = {
//   id: "u1",
//   name: "John Doe",
//   email: "john@example.com",
//   role: "USER",
// };

// --- SAMPLE TASKS ---
// const sampleTasks: Task[] = [
//   {
//     id: "t1",
//     title: "Finish report",
//     description:
//       "Complete the quarterly report and submit it to the manager. Ensure all data is accurate and up-to-date.",
//     status: "PENDING",
//     priority: "HIGH",
//     dueDate: "2025-05-15T00:00:00.000Z",
//     createdById: "u1",
//     assignedToId: "u1",
//   },
//   {
//     id: "t2",
//     title: "Fix critical bug",
//     description: "Resolve production bug affecting checkout system.",
//     status: "COMPLETED",
//     priority: "HIGH",
//     dueDate: "2025-05-12T00:00:00.000Z",
//     createdById: "u1",
//     assignedToId: "u1",
//   },
//   {
//     id: "t3",
//     title: "Team Meeting",
//     description: "Discuss Q2 roadmap and sprint plan.",
//     status: "PENDING",
//     priority: "MEDIUM",
//     dueDate: "2025-05-18T00:00:00.000Z",
//     createdById: "u1",
//   },
//   {
//     id: "t4",
//     title: "Update Website",
//     description: "Refresh landing page content and assets.",
//     status: "PENDING",
//     priority: "LOW",
//     dueDate: "2025-05-25T00:00:00.000Z",
//     createdById: "u1",
//     assignedToId: "u1",
//   },
//   {
//     id: "t5",
//     title: "Buy office supplies",
//     description: "Order printer ink, notebooks, and markers.",
//     status: "PENDING",
//     priority: "LOW",
//     dueDate: "2025-05-30T00:00:00.000Z",
//     createdById: "u1",
//   },
//   {
//     id: "t6",
//     title: "Update Website",
//     description: "Refresh landing page content and assets.",
//     status: "PENDING",
//     priority: "LOW",
//     dueDate: "2025-05-25T00:00:00.000Z",
//     createdById: "u1",
//     assignedToId: "u1",
//   },
//   {
//     id: "t7",
//     title: "Update Website",
//     description: "Refresh landing page content and assets.",
//     status: "PENDING",
//     priority: "LOW",
//     dueDate: "2025-05-25T00:00:00.000Z",
//     createdById: "u1",
//     assignedToId: "u1",
//   },
// ];

export const useTaskStore = create<TaskState>((set) => ({
  // user: sampleUser,
  // tasks: sampleTasks,
  user: null,
  tasks: [],
  assignedTasks: [],
  userList:[],

  setUser: (user) => set({ user }),

  setUserList:(userList) => set({userList}),

  setTasks: (tasks) => set({ tasks }),

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  updateTask: (task) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),
}));
