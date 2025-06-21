import type { Logged_in_Users } from "./Users";

export interface UsersContextProps {
  users: Logged_in_Users[];
  isLoading: boolean;
  currentPage: number;
  pages: number[];
  totalResults: number | null;
  pageSize: number;
  activatedCount: number;
  notActivatedCount: number;
  getAllUsers: (
    pgSize?: number,
    pgNum?: number,
    userName?: string
  ) => Promise<void>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
}