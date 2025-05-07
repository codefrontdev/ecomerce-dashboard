/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductCreateDTO, ProductState } from "../types/product";
import { productsService } from "../services/productsService";

const initialState: ProductState = {
  products: {
    products: [],
    success: false,
    message: "",
    total: 0,
    page: 0,
    totalPages: 0,
    currentPage: 0,
    pageSize: 0,
    productStatusCounts: {
      available: 0,
      disabled: 0,
    },
  },
  product: null,
  loading: false,
  error: null,
  status: "idle",
  filterStatus: "All",
};

export const createProduct = createAsyncThunk(
  "products/create",
  async (credentials: FormData, { rejectWithValue }) => {
    try {
      return await productsService.createProduct(credentials);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "products/getAll",
  async ({ query }: { query?: string }, { rejectWithValue }) => {
    try {
      const products = await productsService.getProducts(query);
      return products;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getProductsCountByStatus = createAsyncThunk(
  "products/getProductsCountByStatus",
  async (_, { rejectWithValue }) => {
    try {
      return await productsService.getProductsCountByStatus();
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getProductById = createAsyncThunk(
  "products/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await productsService.getProductById(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async (
    args: { id: string; credentials: ProductCreateDTO },
    { rejectWithValue }
  ) => {
    try {
      const updatedCredentials = {
        ...args.credentials,
        publishDate: args.credentials.publishDate.toISOString(),
      };
      return await productsService.updateProduct(args.id, updatedCredentials);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      return await productsService.deleteProduct(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getLoaclProduct(state, action) {
      const index = state.products.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index) {
        state.product = state.products.products[index];
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "succeeded";
      state.products.products.push(action.payload);
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
      state.error = action.error.message || "Failed to create product";
    });
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "succeeded";
      state.products = action.payload;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
      state.error = action.error.message || "Failed to fetch all products";
    });
    builder.addCase(getProductById.pending, (state) => {
      state.loading = true;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.product = action.payload
    });
    builder.addCase(getProductById.rejected, (state, action) => {
      
      state.loading = false;
      state.status = "failed";
      state.error = action.error.message || "Failed to get product by id";
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "succeeded";
      const index = state.products.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products.products[index] = action.payload;
      }
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
      state.error = action.error.message || "Failed to update product";
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "succeeded";

      const id = action.meta.arg;
      const product = state.products.products.find((p) => p.id === id);

      if (product) {
        // نقص العداد حسب حالة المنتج
        const statusKey =
          product.status.toLowerCase() as keyof typeof state.products.productStatusCounts;
        state.products.productStatusCounts[statusKey]--;
        // حذف المنتج من القائمة
        state.products.products = state.products.products.filter(
          (p) => p.id !== id
        );
        state.products.total--;
      }

      state.error = null;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
      state.error = action.error.message || "Failed to delete product";
    });
  },
});

export default productSlice.reducer;
