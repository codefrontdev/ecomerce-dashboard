import apiClient from "./apiClient";


export const usersService = {
    createUser: async (user: any) => {
        const response = await apiClient.post("/users", user);
        return response.data;
    },
    getUsers: async (query?: string) => {
        const response = await apiClient.get(`/users${query}`);
        return response.data;
    },
    getUserById: async (id: string) => {
        const response = await apiClient.get(`/users/${id}`);
        return response.data;
    },
    updateUser: async ( user: FormData) => {
        const response = await apiClient.put(`/users`, user);
        return response.data;
    },
    deleteUser: async (id: string) => {
        const response = await apiClient.delete(`/users/${id}`);
        return response.data;
    },

    logOutFromDevice: async (id: string) => {
        const response = await apiClient.delete(`/device-history/${id}`);
        return response.data;
    }
}