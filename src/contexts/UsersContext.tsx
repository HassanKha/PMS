import { createContext, useContext,  useState } from "react";
import { axiosInstance, USERS_URLS } from "../services/Urls";
import { toast } from "react-toastify";
import type { Logged_in_Users } from "../interfaces/Users";
import type { UsersContextProps } from "../interfaces/Users";



export const UsersContext = createContext<UsersContextProps | null>(null);

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<Logged_in_Users[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
 
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState<number[]>([]);
   const [totalResults, setTotalResults] = useState<number | null>(null);
  const [pageSize, setPageSize] = useState(5);

  const getAllUsers = async (pgSize = pageSize, pgNum = currentPage, userName?: string) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(USERS_URLS.GET_LOGGED_IN_USERS, {
        params: {
          pageSize: pgSize,
          pageNumber: pgNum,
          userName
        },
      });

      setUsers(res.data.data || []);
      setPages(Array(res.data.totalNumberOfPages).fill(0).map((_, idx) => idx + 1));
      setItemsPerPage(res.data.pageSize);
      setTotalResults(res.data.totalNumberOfRecords);
      setCurrentPage(pgNum);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to fetch users.");
    } finally {
      setIsLoading(false);
    }
  };


  const activatedCount = users.filter((u) => u.isActivated).length;
  const notActivatedCount = users.filter((u) => !u.isActivated).length;

  return (
    <UsersContext.Provider
      value={{
        users,
        isLoading,
        currentPage,
        pages,
        totalResults,
        pageSize,
        activatedCount,
        notActivatedCount,
        getAllUsers,
        setPageSize,
        setCurrentPage,
        itemsPerPage
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = () => {
  const ctx = useContext(UsersContext);
  if (!ctx) throw new Error("useUsersContext must be used within a UsersProvider");
  return ctx;
};

export default UsersProvider;