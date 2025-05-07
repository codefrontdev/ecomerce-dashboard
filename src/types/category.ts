/** @format */

export type CategoryStatus = "active" | "inactive";

export interface Category {
  id: string;
  name: string;
  description?: string;
  tags?: string[];
  status: CategoryStatus;
  image?: {
    publicId: string;
    url: string;
  };// العلاقة العكسية من الفئة إلى المنتجات
  createdAt: string;
  updatedAt: string;
}

export interface CategoryState {
  category: Category | null;
  categories: {
    categories: Category[];
    success: boolean;
    message: string;
    total: number;
    page: number;
    pageSize: number;
    categoryStatusCounts: {
      active: number;
      inactive: number;
    };
  };
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

export interface CategoryCreateDTO {
  name: string;
  description?: string;
  tags?: string[];
  status?: CategoryStatus; // يمكن تركه اختياريًا لأن لديه قيمة افتراضية
  image?: string; // يتم تمرير publicId فقط أو URL مباشر
}

export interface CategoryUpdateDTO {
  name?: string;
  description?: string;
  tags?: string[];
  status?: CategoryStatus;
  image?: string;
}
