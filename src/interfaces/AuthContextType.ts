import type { DecodedToken } from "./DecodedToken";
import type { User } from "./UserProfile";

export interface AuthContextType {
  LoginData: DecodedToken| null;
  SaveLoginData: () => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginData: React.Dispatch<React.SetStateAction<DecodedToken| null>>;
  CurrentUserData : User | null | undefined
}