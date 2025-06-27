
import type { User } from "./Users";
import type { ReactNode } from "react";


export interface AuthContextType {
  LoginData: DecodedToken| null;
  SaveLoginData: () => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginData: React.Dispatch<React.SetStateAction<DecodedToken| null>>;
  CurrentUserData : User | null | undefined
}
export interface AuthProviderProps {
  children: ReactNode;
}
export interface ForgetPasswordForm {
  email: string;
  seed?: string;
  password?: string;
  confirmPassword?: string;
};

export interface FormDataCahangePassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
export interface FormDataRegister {
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  profileImage?: FileList;
}


export interface FormDataVerify {
  email: string;
  code: string;
};

export type LoginFormInputs = {
  email: string;
  password: string;
};

export interface DecodedToken {
  userId: number;
  roles: string[];
  userName: string;
  userEmail: string;
  userGroup: string;
  iat: number;
  exp: number;
}