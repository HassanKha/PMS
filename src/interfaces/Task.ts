export interface Task {
  id: number;
  title: string;
  description: string;
  status: "ToDo" | "InProgress" | "Done"; 
  creationDate: string;       
  modificationDate: string;
}

export interface postTask {
  id?: string;
  title: string;
  description: string;
  employeeId: string;
  projectId: string;
  status?: string;
  employee?: { id: string; userName: string };
  project?: { id: string; title: string };
}
