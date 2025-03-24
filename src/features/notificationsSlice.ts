/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// تعريف نوع الإشعار
export type NotificationType = "info" | "error" | "success";

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean; // إضافة حالة القراءة
}

interface NotificationsState {
  notifications: Notification[];
  loading: boolean; // حالة التحميل
  error: string | null; // حالة الخطأ
}

const initialState: NotificationsState = {
  notifications: [],
  loading: false,
  error: null,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {

        // إضافة إشعار جديد اذا لم يكن موجود
      if (!state.notifications.find((notif) => notif.id === action.payload.id)) {
        state.notifications.push(action.payload);
      }
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    markAsRead: (state, action: PayloadAction<number>) => {
      const notification = state.notifications.find(
        (notif) => notif.id === action.payload
      );
      if (notification) {
        notification.read = true; // تحديث حالة القراءة
      }
    },
  },
});

export const {
  addNotification,
  removeNotification,
  clearNotifications,
  setLoading,
  setError,
  markAsRead,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
