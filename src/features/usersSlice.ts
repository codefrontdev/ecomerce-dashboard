import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserState } from "../types/users";
import { usersService } from "../services/usersService";

const initialState: UserState = {
  users: {
    users: [],
    success: false,
    message: "",
    total: 0,
    page: 0,
    pageSize: 0,
    lastPage: 0,
    totalPages: 0,
    nextPage: null,
  },
  user: null,
  loading: false,
  error: null,
  status: "idle",
};

export const createUser = createAsyncThunk(
  "users/create",
  async (credentials: FormData, { rejectWithValue }) => {
    try {
      return await usersService.createUser(credentials);
    } catch (error: any) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "users/getAll",
  async ({ query }: { query?: string }, { rejectWithValue }) => {
    try {
      return await usersService.getUsers(query);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getUserById = createAsyncThunk(
  "users/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      return await usersService.getUserById(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const logOutFromDevice = createAsyncThunk(
  "device-history/logout",
  async (id: string, { rejectWithValue }) => {
    try {
      return await usersService.logOutFromDevice(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/update",
  async (args: {  credentials: FormData }, { rejectWithValue }) => {
    try {
      return await usersService.updateUser(args.credentials);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      return await usersService.deleteUser(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users.users?.push(action.payload);
        state.error = null;
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to create user";
      })
      .addCase(getAllUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch users";
      })
      .addCase(getUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user";
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update user";
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        const id = action.meta.arg;
        state.users.users = state.users.users.filter((user) => user.id !== id);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete user";
      })
      .addCase(logOutFromDevice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logOutFromDevice.fulfilled, (state, action) => {
        state.status = "succeeded";
        const id = action.meta.arg;
        if (state.user?.deviceHistory) {
          state.user.deviceHistory = state.user.deviceHistory.filter(
            (device) => device.id !== id
          );
        }
      
      })
      .addCase(logOutFromDevice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to log out from device";
      });
  },
});

export default usersSlice.reducer;
