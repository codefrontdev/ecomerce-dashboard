/** @format */

import { CategoryCreateDTO } from "../types/category";
import apiClient from "./apiClient";

export const categoriesService = {
  getCategories: async (query?: string) => {
    const response = await apiClient.get(`/categories${query}`);
    return response.data;
  },

  getCategoryById: async (id: string) => {
    const response = await apiClient.get(`/categories/${id}`);
    return response.data;
  },

  createCategory: async (category: CategoryCreateDTO) => {
    const response = await apiClient.post("/categories", category);
    return response.data;
  },

  updateCategory: async (id: string, category: CategoryCreateDTO) => {
    const response = await apiClient.put(`/categories/${id}`, category);
    return response.data;
  },

  deleteCategory: async (id: string) => {
    const response = await apiClient.delete(`/categories/${id}`);
    return response.data;
  },
};
