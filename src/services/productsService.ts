/** @format */

import { ProductUpdateDTO } from "../types/product";
import apiClient from "./apiClient";

export const productsService = {
  getProducts: async (query?: string) => {
    const response = await apiClient.get(`/products${query}`);
    return response.data;
  },
  getProductById: async (id: string) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  getProductsCountByStatus: async () => {
    const response = await apiClient.get(`/products/status`);
    return response.data;
  },

  createProduct: async (product: FormData) => {
    const response = await apiClient.post("/products", product);
    return response.data;
  },

  updateProduct: async (id: string, product: ProductUpdateDTO) => {
    const response = await apiClient.put(`/products/${id}`, product);
    return response.data;
  },

  deleteProduct: async (id: string) => {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  },
  getProductsByCategory: async (category: string) => {
    const response = await apiClient.get(`/products/category/${category}`);
    return response.data;
  },
};
