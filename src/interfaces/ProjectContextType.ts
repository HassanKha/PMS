import type { Project } from "./Project";

export interface ProjectContextType {
 projects: Project[];
  totalResults: number | null;
  pages: number[];
  loading: boolean;
  error: string | null;
  fetchProjects: (pageSize: number, pageNumber: number, title: string) => void;
}