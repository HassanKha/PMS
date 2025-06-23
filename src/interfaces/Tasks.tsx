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
