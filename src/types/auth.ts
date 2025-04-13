export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    profilePicture: string;
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