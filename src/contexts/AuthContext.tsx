import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import type {  FC } from "react";
import type { DecodedToken } from "../interfaces/DecodedToken";
import type { AuthContextType } from "../interfaces/AuthContextType";
import type { AuthProviderProps } from "../interfaces/AuthProviderProps";



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

  const [LoginData, setLoginData] = useState<DecodedToken | null>(
    getInitialLoggedData()
  );

  const SaveLoginData = () => {
    const encodedToken = localStorage.getItem("token");
    if (encodedToken) {
      try {
        const decoded = jwtDecode<DecodedToken>(encodedToken);
        setLoginData(decoded);
      } catch (err) {
        console.error("Error decoding token in SaveLoginData", err);
      }
    }
  };

  useEffect(() => {
    if (!LoginData) {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decodedToken = jwtDecode<DecodedToken>(token);
          setLoginData(decodedToken);
        } catch (error: any) {
          console.error("Invalid token:", error.message);
          localStorage.removeItem("token"); // Clean up
        }
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ LoginData, SaveLoginData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
