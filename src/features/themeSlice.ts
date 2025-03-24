/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type ThemeMode = 'dark' | 'light';

interface ThemeState {
  mode: ThemeMode;
}

const initialState: ThemeState = {
    mode: (localStorage.getItem('theme') || 'light') as ThemeMode,
};


const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
        state.mode = state.mode === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', state.mode);
    },
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
        state.mode = action.payload;
        localStorage.setItem('theme', state.mode);
    },
  },
});


export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
