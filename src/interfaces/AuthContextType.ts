import type { DecodedToken } from "./DecodedToken";

export interface AuthContextType {
  LoginData: DecodedToken| null;
  SaveLoginData: () => void;
}