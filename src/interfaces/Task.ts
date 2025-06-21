export interface Task {
  id: number;
  title: string;
  description: string;
  status: "ToDo" | "InProgress" | "Done"; // adjust if needed
  creationDate: string;       // e.g. "2025-06-20T01:20:41.372Z"
  modificationDate: string;
}
