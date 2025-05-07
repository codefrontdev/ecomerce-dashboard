
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategoryCreateDTO, CategoryState } from "../types/category";
import { categoriesService } from "../services/categoriesService";

const initialState: CategoryState = {
    categories: {
        categories: [],
        success: false,
        message: "",
        total: 0,
        page: 0,
        pageSize: 0,
        categoryStatusCounts: {
            active: 0,
            inactive: 0,
        },
    },
    category: null,
    loading: false,
    error: null,
    status: "idle",
};

export const createCategory = createAsyncThunk(
  "categories/create",
  async (credentials: CategoryCreateDTO, { rejectWithValue }) => {
    try {
      return await categoriesService.createCategory(credentials);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllCategories = createAsyncThunk(
  "categories/getAll",
  async ({ query }: { query?: string }, { rejectWithValue }) => {
    try {
      console.log(query);
      return await categoriesService.getCategories(query);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getCategoryById = createAsyncThunk(
  "categories/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await categoriesService.getCategoryById(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/update",
  async (
    args: { id: string; credentials: CategoryCreateDTO },
    { rejectWithValue }
  ) => {
    try {
      return await categoriesService.updateCategory(args.id, args.credentials);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      return await categoriesService.deleteCategory(id);
      
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.categories.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message || "Failed to create category";
      })

      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch categories";
      })

      .addCase(getCategoryById.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.category = action.payload;
      })
      .addCase(getCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch category";
      })

      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        const index = state.categories.categories.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.categories.categories[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message || "Failed to update category";
      })

      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.categories.categories = state.categories.categories.filter(c => c.id !== action.meta.arg);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message || "Failed to delete category";
      });
  },
});

export default categorySlice.reducer;
