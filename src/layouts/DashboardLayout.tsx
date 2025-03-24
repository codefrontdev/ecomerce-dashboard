/** @format */

import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Navbar from "./Navbar";
import { useTheme } from "../hooks/useTheme";
const DashboardLayout = () => {
  const { theme } = useTheme();
  return (
    <main
      className={`container mx-auto w-full max-w-full flex p-5 gap-5 bg-[#fafaf2] dark:bg-gray-800 ${theme}`}>
      <SideBar />
      <div className='flex flex-col w-full'>
        <Navbar />
        <Outlet />
      </div>
    </main>
  );
};

export default DashboardLayout;
