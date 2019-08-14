export interface User {
  email: string;
  isOnline: boolean;
  token: string;
  username: string;
}

export interface Room {
  members: Members[];
  messages: Messages[];
  name: string;
  uid: string;
}

export interface Messages {
  uid: string;
  message: string;
  createdAt: string;
  author: string;
}

export interface Members {
  username: string;
  email: string;
  online: boolean;
}