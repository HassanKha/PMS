import { createContext, useContext, useState, type ReactNode } from "react";
import { axiosInstance, PROJECTS_URLS } from "../services/Urls";
import type { Project } from "../interfaces/Project";
import { AuthContext } from "./AuthContext";
import type { ProjectContextType } from "../interfaces/ProjectContextType";



export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(null);
  const [pages, setPages] = useState<number[]>([]);

  const auth = useContext(AuthContext);

  const fetchProjects = async (pageSize: number, pageNumber: number, title: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(
        PROJECTS_URLS.GET_PROJECTS(auth?.LoginData?.roles?.[0] ?? ""),
        { params: { pageSize, pageNumber, title } }
      );

      const data = response.data.data.map((proj: Project) => ({
        ...proj,
        numTasks: proj.task.length,
        tasksCount: proj.task,
      }));
      setTotalResults(response.data.totalNumberOfRecords);
      setPages(Array(response.data.totalNumberOfPages).fill(0).map((_, idx) => idx + 1));
      setProjects(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProjectContext.Provider value={{ projects, totalResults, pages, loading, error, fetchProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectContext must be used within a ProjectProvider");
  }
  return context;
};


export default ProjectProvider;