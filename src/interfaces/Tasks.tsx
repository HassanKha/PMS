export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  creationDate: string;
  modificationDate: string;
  project: {
    id: number;
    title: string;
    description: string;
  };
  employee: {
    id: number;
    userName: string;
    email: string;
  };
}

export interface TasksCount {
  toDo: number ;
  inProgress: number;
  done:number
}

export interface TaskContextType {
  tasks: Task[];
  totalResults: number | null;
  pages: number[];
  loading: boolean;
  error: string | null;
  fetchTasks: (pageSize: number, pageNumber: number, title: string) => Promise<void>;
}