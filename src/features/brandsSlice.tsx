
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BrandCreateDTO, BrandState } from "../types/brand";
import { brandsService } from "../services/brandsService";

const initialState: BrandState = {
  brands: {
    brands: [],
    success: false,
    message: "",
    total: 0,
    page: 0,
    pageSize: 0,
  },
  brand: {
    data: null,
    success: false,
    message: "",
  },
  loading: false,
  error: null,
  status: "idle",
};

export const createBrand = createAsyncThunk(
  "brands/create",
  async (credentials: BrandCreateDTO, { rejectWithValue }) => {
    try {
      return await brandsService.createBrand(credentials);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllBrands = createAsyncThunk(
  "brands/getAll",
  async ({ query }: { query?: string }, { rejectWithValue }) => {
    try {
      return await brandsService.getBrands(query);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getBrandById = createAsyncThunk(
  "brands/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await brandsService.getBrandById(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateBrand = createAsyncThunk(
  "brands/update",
  async (
    args: { id: string; credentials: BrandCreateDTO },
    { rejectWithValue }
  ) => {
    try {
      return await brandsService.updateBrand(args.id, args.credentials);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteBrand = createAsyncThunk(
  "brands/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      return await brandsService.deleteBrand(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBrand.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.brands.brands.push(action.payload);
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message || "Failed to create brand";
      })

      .addCase(getAllBrands.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.brands = action.payload;
      })
      .addCase(getAllBrands.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch brands";
      })

      .addCase(getBrandById.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(getBrandById.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        console.log(action.payload);
        state.brand = action.payload;
      })
      .addCase(getBrandById.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch brand";
      })

      .addCase(updateBrand.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        const index = state.brands.brands.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) {
          state.brands.brands[index] = action.payload;
        }
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message || "Failed to update brand";
      })

      .addCase(deleteBrand.pending, (state) => {
        state.loading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        const id = action.meta.arg
        const index = state.brands.brands.findIndex((b) => b.id === id);
        console.log(index);
        if (index !== -1) {
          state.brands.brands.splice(index, 1);
        }
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message || "Failed to delete brand";
      });
  },
});

export default brandSlice.reducer;
