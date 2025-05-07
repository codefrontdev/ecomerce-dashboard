/** @format */

import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Navbar from "./Navbar";
const DashboardLayout = () => {
  
  return (
    <>
      <div className='flex-1 flex gap-4 min-w-full h-[calc(100vh - 100px)]'>
        {/* Sidebar ثابت */}
        <SideBar />

        {/* الجزء الرئيسي */}
        <div className='flex flex-col max-w-full w-full h-full'>
          {/* Navbar ثابت */}
          <Navbar />

          {/* المحتوى القابل للتمرير */}
          <div className='flex-1 overflow-y-auto max-h-full pr-10'>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
