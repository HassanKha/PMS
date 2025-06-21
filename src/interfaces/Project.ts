import type { Task } from "./Task";

export interface Project {
  id: number;
  title: string;
  description: string;
  creationDate: string;        // e.g. "2025-06-20T01:12:37.838Z"
  modificationDate: string;
  task: Task[];  
  numTasks: number;      // total number of tasks
  tasksCount: Task[];
}