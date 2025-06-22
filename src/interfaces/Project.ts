import type { Task } from "./Task";

export interface Project {
  id: number;
  title: string;
  description: string;
  creationDate: string;        
  modificationDate: string;
  task: Task[];  
  numTasks: number;  
  tasksCount: Task[];
}