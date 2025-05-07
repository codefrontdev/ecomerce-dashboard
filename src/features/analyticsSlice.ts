
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { analyticsService } from "../services/analyticsService";
import { AnalyticsSales, AnalyticsState } from "../types/analytics";



const initialState: AnalyticsState = {
  overview: {
    revenue: {
      value: 0,
      percentage: 0,
      chart: [],
    },
    visitors: {
      value: 0,
      percentage: 0,
      chart: [],
    },
    transactions: {
      value: 0,
      percentage: 0,
      chart: [],
    },
    inventory: {
      value: 0,
      percentage: 0,
      chart: [],
    },
  },
  sales: {
    message: "",
    success: false,
    data: {
      period: "",
      sales: [],
    },
  },
  salesByCategory: 
  {
    message: "",
    success: false,
    data: {
      period: "",
      sales: [],
    },
  },
  topSelling: {
    message: "",
    success: false,
    data: [],
  },
  loading: false,
  error: null,
};

export const getOverview = createAsyncThunk(
  "analytics/getOverview",
  async (_, { rejectWithValue }) => {
    try {
      return await analyticsService.getOverview();
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getSales = createAsyncThunk(
  "analytics/getSales",
  async (period: AnalyticsSales, { rejectWithValue }) => {
    try {
      return await analyticsService.getSales(period);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getSalesByCategory = createAsyncThunk(
  "analytics/getSalesByCategory",
  async (period: AnalyticsSales, { rejectWithValue }) => {
    try {
      return await analyticsService.getSalesByCategory(period);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const topSellingProducts = createAsyncThunk(
  "analytics/topSellingProducts",
  async (sortBy: string, { rejectWithValue }) => {
    try {
      return await analyticsService.getTopSellingProducts(sortBy);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Overview
      .addCase(getOverview.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOverview.fulfilled, (state, action) => {
        state.loading = false;
        state.overview = action.payload;
      })
      .addCase(getOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Sales
      .addCase(getSales.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSales.fulfilled, (state, action) => {
        state.loading = false;
        state.sales = action.payload;
      })
      .addCase(getSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Sales By Category
      .addCase(getSalesByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSalesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.salesByCategory = action.payload;
      })
      .addCase(getSalesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Top Selling
      .addCase(topSellingProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(topSellingProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.topSelling = action.payload;
      })
      .addCase(topSellingProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default analyticsSlice.reducer;
