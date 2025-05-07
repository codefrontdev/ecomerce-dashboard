/** @format */

import { Brand } from "./brand";
import { Category } from "./category";

export type ProductStatusType = "Available" | "Disabled";
export type SortedByType = "Price" | "Sold" | "Total Earning";
export interface Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  tags: string[];
  shortDescription: string;
  status: ProductStatusType;
  visibility: string;
  publishDate: string;
  manufacturerName: string;
  manufacturerBrand: string;
  stock: string;
  price: string;
  discount: string;
  orders: string;
  image?: {
    publicId: string;
    url: string;
  };
  images?: {
    publicId: string;
    url: string;
  }[];
  colors?: string[];
  sizes?: string[];
  attributes?: string[];
  attributesValues?: string[];
  brand: Brand;
  subCategory: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductState {
  product: Product | null;
  products: {
    products: Product[];
    success: boolean;
    message: string;
    total: number;
    totalPages: number;
    page: number;
    pageSize: number;
    currentPage: number;
    productStatusCounts: {
      available: number;
      disabled: number;
    };
  };
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  filterStatus: "All" | "Disabled" | "Available";
}

export interface ProductCreateDTO {
  name: string;
  description: string;
  category: string;
  tags: string[];
  shortDescription: string;
  status: string;
  visibility: string;
  publishDate: Date; // هنا قمنا بتغيير نوع التاريخ إلى string لتتناسب مع واجهة الـ DTO
  manufacturerName: string;
  manufacturerBrand: string;
  stock: number; // هنا قمنا بتغيير نوع المخزون إلى number
  price: number; // هنا قمنا بتغيير نوع السعر إلى number
  discount: number; // هنا قمنا بتغيير نوع الخصم إلى number
  orders: number; // هنا قمنا بتغيير نوع الطلبات إلى number
  image?: string;
  images?: string[];
  colors?: string[];
  sizes?: string[];
  attributes?: string[];
  attributesValues?: string[];
}
export interface ProductUpdateDTO {
  name?: string;
  description?: string;
  category?: string;
  tags?: string[];
  shortDescription?: string;
  status?: string;
  visibility?: string;
  publishDate?: string; // هنا قمنا بتغيير نوع التاريخ إلى string لتتناسب مع واجهة الـ DTO
  manufacturerName?: string;
  manufacturerBrand?: string;
  stock?: number; // هنا قمنا بتغيير نوع المخزون إلى number
  price?: number; // هنا قمنا بتغيير نوع السعر إلى number
  discount?: number; // هنا قمنا بتغيير نوع الخصم إلى number
  orders?: number; // هنا قمنا بتغيير نوع الطلبات إلى number
  image?: string;
  images?: string[];
  colors?: string[];
  sizes?: string[];
  attributes?: string[];
  attributesValues?: string[];
}
