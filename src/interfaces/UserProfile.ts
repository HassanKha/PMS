export interface UserGroup {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}

export interface User {
  id: number;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  imagePath: string | null;
  isActivated: boolean;
  group: UserGroup;
  creationDate: string;
  modificationDate: string;
}

export interface UserPrfoile {
 
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  imagePath: string | null;
  confirmPassword:string
}