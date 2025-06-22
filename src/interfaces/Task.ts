export interface Task {
  id: number;
  title: string;
  description: string;
  status: "ToDo" | "InProgress" | "Done"; 
  creationDate: string;       
  modificationDate: string;
}
