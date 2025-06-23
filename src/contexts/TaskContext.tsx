import { createContext, useContext, useState, type ReactNode } from "react";
import { axiosInstance, TASKS_URLS } from "../services/Urls";
import type { TaskContextType } from "../interfaces/TaskContextType";
import type { Task } from "../interfaces/Tasks";


export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState<number | null>(null);
  const [pages, setPages] = useState<number[]>([]);



  const fetchTasks = async (pageSize: number, pageNumber: number, title: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.get(TASKS_URLS.GET_TASKS_MANAGER, {
        params: { pageSize, pageNumber, title },
      });

     
      setTotalResults(response.data.totalNumberOfRecords);
      setPages(Array(response.data.totalNumberOfPages).fill(0).map((_, idx) => idx + 1));
       setTasks(response.data.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong while fetching tasks.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, totalResults, pages, loading, error, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
