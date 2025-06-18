export interface DecodedToken {
  userId: number;
  roles: string[];
  userName: string;
  userEmail: string;
  userGroup: string;
  iat: number;
  exp: number;
}