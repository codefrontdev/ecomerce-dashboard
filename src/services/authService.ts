
import { SignIn, SignUp } from "../types/auth";
import apiClient from "./apiClient";


export const authService = {
  signIn: async (credentials: SignIn) => {
    const response = await apiClient.post("/auth/signin", credentials);
    return response.data;
  },

  signUp: async (credentials: SignUp) => {
    const response = await apiClient.post("/auth/signup", credentials);
    return response.data;
  },

  myAccount: async () => {
    const response = await apiClient.get("/auth/my-account");
    return response.data;
  },

  signOut: async () => {
    const response = await apiClient.get("/auth/signout");
    return response.data;
  },

  refreshToken: async () => {
    const response = await apiClient.get("/auth/refresh-token");
    return response.data;
  },

  activeAccount: async (credentials: any) => {
    const response = await apiClient.post("/auth/active-account", credentials);
    return response.data;
  },
};