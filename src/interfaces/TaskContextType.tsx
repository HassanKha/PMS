import type  {Task}  from "./Tasks";

export interface TaskContextType {
  tasks: Task[];
  totalResults: number | null;
  pages: number[];
  loading: boolean;
  error: string | null;
  fetchTasks: (pageSize: number, pageNumber: number, title: string) => Promise<void>;
}