/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthState, SignIn } from "../types/auth";
import { authService } from "../services/authService";
import { usersService } from "../services/usersService";

const initialState: AuthState = {
  user: null,
  loading: false,
  isAuthenticated: localStorage.getItem("isAuthenticated") ? true : false,
  error: null,
  status: {
    signIn: "idle",
    myAccount: "idle",
    signOut: "idle",
  },
};

export const signIn = createAsyncThunk(
  "auth/signin",
  async (credentials: SignIn, { rejectWithValue }) => {
    try {
      return await authService.signIn(credentials);
    } catch (error: any) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

export const myAccount = createAsyncThunk(
  "auth/my-account",
  async (_, { rejectWithValue }) => {
    try {
      return await authService.myAccount();
    } catch (error: any) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);
export const updateProfile = createAsyncThunk(
  "users/update",
  async (args: {  credentials: FormData }, { rejectWithValue }) => {
    try {
      return await usersService.updateUser(args.credentials);
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

export const signOut = createAsyncThunk(
  "auth/signout",
  async (_, { rejectWithValue }) => {
    try {
      return await authService.signOut();
    } catch (error: any) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status.signIn = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state) => {
        state.status.signIn = "succeeded";
        state.isAuthenticated = true;
        localStorage.setItem("isAuthenticated", "true");
        state.error = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status.signIn = "failed";
        // state.isAuthenticated = false;
        state.loading = false;
        localStorage.removeItem("isAuthenticated");
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(myAccount.pending, (state) => {
        state.status.myAccount = "loading";
        // state.isAuthenticated = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(myAccount.fulfilled, (state, action) => {
        state.status.myAccount = "succeeded";
        // state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(myAccount.rejected, (state, action) => {
        state.status.myAccount = "failed";
        // state.isAuthenticated = false;
        state.loading = false;
        localStorage.removeItem("isAuthenticated");
        state.error = action.error.message || "Something went wrong";
      })

      .addCase(updateProfile.pending, (state) => {
        state.status.myAccount = "loading";
        // state.isAuthenticated = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status.myAccount = "succeeded";
        // state.isAuthenticated = true;
        state.user = action.payload.data;
        console.log(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status.myAccount = "failed";
        // state.isAuthenticated = false;
        state.loading = false;
        localStorage.removeItem("isAuthenticated");
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(signOut.pending, (state) => {
        state.status.signOut = "loading";
      })
      .addCase(signOut.fulfilled, (state) => {
        state.status.signOut = "succeeded";
        state.isAuthenticated = false;
        localStorage.removeItem("isAuthenticated");
        state.user = null;
        state.error = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.status.signOut = "failed";
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(logOutFromDevice.pending, (state) => {
        state.loading = true;
      })
      .addCase(logOutFromDevice.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.meta.arg;
        if (state.user?.deviceHistory) {
          state.user.deviceHistory = state.user.deviceHistory.filter(
            (device) => device.id !== id
          );
        }
      })
      .addCase(logOutFromDevice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to log out from device";
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
