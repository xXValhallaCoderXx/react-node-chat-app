export interface User {
  uid: string;
  email: string;
  username: string;
  password: string;
  online?: boolean;
  token?: string;
}
