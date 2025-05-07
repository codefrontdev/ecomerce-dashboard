/** @format */

import { BrandCreateDTO } from "../types/brand";
import apiClient from "./apiClient";

export const brandsService = {
  getBrands: async (query?: string) => {
    const response = await apiClient.get(`/brands${query}`);
    return response.data;
  },

  getBrandById: async (id: string) => {
    const response = await apiClient.get(`/brands/${id}`);
    console.log(response.data);
    return response.data;
  },

  createBrand: async (brand: BrandCreateDTO) => {
    const response = await apiClient.post("/brands", brand);
    return response.data;
  },

  updateBrand: async (id: string, brand: BrandCreateDTO) => {
    const response = await apiClient.put(`/brands/${id}`, brand);
    return response.data;
  },

  deleteBrand: async (id: string) => {
    const response = await apiClient.delete(`/brands/${id}`);
    return response.data;
  },
};
