import { Order } from "./orders";


export enum Role {
    ADMIN = "admin",
    CUSTOMER = "customer"
}

export enum Status {
    ACTIVE = "active",
    INACTIVE = "inactive"
}


export interface UserDevice {
  id: string;
  userId: string;
  ipAddress: string;
  userAgent: string;
  deviceType: string;
  os: string;
  browser: string;
  location?: string; // اختياري لأنه nullable
  loginAt: Date;
}


export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  postalCode: string;
  address: string;
  role: Role;
  profilePicture: {
    publicId: string;
    url: string;
  };
}
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  status: Status;
  profilePicture?: {
    publicId: string;
    url: string;
  };
  comments: any[];
  reviews: any[];
  failedAttempts: number;
  lastFailedAttempt: Date | null;
  deviceHistory: UserDevice[];
  orders: Order[];
  phone?: string; 
  address?: string; 
  createdAt: Date;
  updatedAt: Date; 
}

export interface UserState {
  user: User | null;
  users: {
    users: User[];
    success: boolean;
    message: string;
    total: number;
    page: number;
    pageSize: number;
    lastPage: number;
    totalPages: number;
    nextPage: number | null;
  };
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}


