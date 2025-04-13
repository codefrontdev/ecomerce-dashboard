/** @format */

import React from "react";
import { useTheme } from "../hooks/useTheme";

import { ToastContainer } from "react-toastify";

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme } = useTheme();
  return (

    <main
      className={`relative container mx-auto w-full max-w-full flex p-5 gap-5 h-screen bg-[#fafaf2] dark:bg-gray-800 ${theme}`}>
      <ToastContainer autoClose={3000} theme={theme} position='top-right' />
      {children}
    </main>
  );
};

export default ThemeProvider;
