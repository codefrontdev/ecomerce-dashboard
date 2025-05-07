/** @format */

import { Product } from "./product";

export interface Brand {
  id: string;
  name: string;
  logo?: {
    publicId: string;
    url: string;
  };
  products?: Product[];
  createdAt: string;
  updatedAt: string;
}

export interface BrandState {
  brand: {
    data: Brand | null;

    success: boolean;
    message: string;
  };
  brands: {
    brands: Brand[];
    success: boolean;
    message: string;
    total: number;
    page: number;
    pageSize: number;
  };
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

export interface BrandCreateDTO {
  name: string;
  logo?: string; // publicId فقط أو URL مباشر
}

export interface BrandUpdateDTO {
  name?: string;
  logo?: string;
}
