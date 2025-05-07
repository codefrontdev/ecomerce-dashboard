import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OrderState } from "../types/orders";
import { ordersService } from "../services/ordersService";

const initialState: OrderState = {
  invoice: null,
  orders: {
    data: [],
    success: false,
    message: "",
    total: 0,
    page: 0,
    pageSize: 0,
    totalPages: 0,
    orderStatusCounts: {
      failed: {
        abanded: 0,
        returned: 0,
        canceled: 0,
        damaged: 0,
      },
      succeeded: {
        total: 0,
        pending: 0,
        completed: 0,
        progress: 0,
      },
    },
  },
  order: {
    data: null,
    success: false,
    message: "",
  },
  loading: false,
  error: null,
  status: "idle",
  //   filterStatus: "All",
};

export const createOrder = createAsyncThunk(
  "orders/create",
  async (credentials: any, { rejectWithValue }) => {
    try {
      return await ordersService.createOrder(credentials);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getOrders = createAsyncThunk(
  "orders/getOrdersCountByStatus",
  async ({ query }: { query?: string }, { rejectWithValue }) => {
    try {
      return await ordersService.getOrders(query);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getOrderById = createAsyncThunk(
  "orders/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await ordersService.getOrderById(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const sendInvoice = createAsyncThunk(
  "orders/sendInvoice",
  async (data: any, { rejectWithValue }) => {
    try {
      return await ordersService.sendInvoice(data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createInvoice = createAsyncThunk(
  "orders/createInvoice",
  async (id: string, { rejectWithValue }) => {
    try {
      return await ordersService.createInvoice(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const getInvoiceByOrderId = createAsyncThunk(
  "orders/getInvoiceByOrderId",
  async (id: string, { rejectWithValue }) => {
    try {
      return await ordersService.getInvoiceByOrderId(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "orders/update",
  async (args: { id: string; credentials: any }, { rejectWithValue }) => {
    try {
      return await ordersService.updateOrder(args.id, args.credentials);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      return await ordersService.deleteOrder(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch orders";
      })
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch order";
      })
      .addCase(sendInvoice.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.invoice = action.payload;
      })
      .addCase(sendInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to send invoice";
      })

      .addCase(createInvoice.pending, (state) => {
        state.loading = true;
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.invoice = action.payload;
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create invoice";
      })
      .addCase(getInvoiceByOrderId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInvoiceByOrderId.fulfilled, (state, action) => {
        state.loading = false;
        state.invoice = action.payload;
      })
      .addCase(getInvoiceByOrderId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch invoice";
      })
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update order";
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.meta.arg;

        const index = state.orders.data.findIndex((o) => o.id === id);
        if (index !== -1) {
          // إذا تم العثور على العنصر، حذفه
          state.orders.data.splice(index, 1);
        }
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete order";
      });
  },
});

export default ordersSlice.reducer;
