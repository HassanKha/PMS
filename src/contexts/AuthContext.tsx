import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import type { FC } from "react";
import type { DecodedToken } from "../interfaces/AuthContextType";
import type { AuthContextType } from "../interfaces/AuthContextType";
import type { AuthProviderProps } from "../interfaces/AuthContextType";
import { axiosInstance, USERS_URLS } from "../services/Urls";
import type { User } from "../interfaces/Users";
import { toast } from "react-toastify";



export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider: FC<AuthProviderProps> = ({ children }) => {
  const getInitialLoggedData = (): DecodedToken | null => {
    try {
      const token = localStorage.getItem("token");
      return token ? jwtDecode<DecodedToken>(token) : null;
    } catch (err) {
      return null;
    }
  };
  const [loading, setLoading] = useState<boolean>(false);

  const [LoginData, setLoginData] = useState<DecodedToken | null>(
    getInitialLoggedData()
  );

  const [CurrentUserData, setCurrentUserData] = useState<User | null>();

  const SaveLoginData = () => {
    setLoading(true)
    const encodedToken = localStorage.getItem("token");
    if (encodedToken) {
      try {
        const decoded = jwtDecode<DecodedToken>(encodedToken);
        setLoginData(decoded);
        GetCurrentUser()
        setLoading(false)
      } catch (err) {
        console.error("Error decoding token in SaveLoginData", err);
        setLoading(true)
      }
    }
  };

  const GetCurrentUser = async () => {
    try {
      let response = await axiosInstance.get(USERS_URLS.GET_CURRENT_USER, {
        params: { pageSize: 965, pageNumber: 1 }
      }
      )
      setCurrentUserData(response?.data)
    }
    catch (error: any) {
      toast.error(error?.response?.data?.message || 'An error occurred');
    }
  }


  useEffect(() => {
    if (!LoginData) {
      setLoading(true)
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decodedToken = jwtDecode<DecodedToken>(token);
          setLoginData(decodedToken);

        } catch (error: any) {
          toast.error(error?.response?.data?.message || 'invalid token');
          localStorage.removeItem("token");
        }
        finally {
          setLoading(false)
        }
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ LoginData, setLoginData, SaveLoginData, CurrentUserData, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
