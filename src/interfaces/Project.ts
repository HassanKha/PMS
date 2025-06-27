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


export interface ProjectContextType {
 projects: Project[];
  totalResults: number | null;
  pages: number[];
  loading: boolean;
  error: string | null;
  fetchProjects: (pageSize: number, pageNumber: number, title: string) => void;
}