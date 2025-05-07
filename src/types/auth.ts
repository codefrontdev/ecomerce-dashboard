import { UserDevice } from "./users";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  about: string;
  website: string;
  country: string;
  city: string;
  postalCode: string;
  email: string;
  role: string;
  status: string;
  profilePicture: {
    publicId: string;
    url: string;
  };
  deviceHistory: UserDevice[];
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface SignInResponse {
    user: User;
}

export interface SignUpResponse {
    user: User;
}

type AsyncStatus = "idle" | "loading" | "succeeded" | "failed";


export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    status:{
        signIn: AsyncStatus;
        myAccount: AsyncStatus;
        signOut: AsyncStatus;
    };
    isAuthenticated: boolean;
}

export interface SignUp {
    name: string;
    email: string;
    password: string;
}

export interface SignIn {
    email: string;
    password: string;
}

export interface ActiveAccount {
    token: string
    code: string
}