export interface Logged_in_Users  {
    id:number
    userName:string,
    email:string,
    phoneNumber:string,
    isActivated:boolean,
    creationDate:string,
    modificationDate:string,
    country:string,
    imagePath:string
    
}

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