/** @format */

// components/ChatHeader.tsx
import React from "react";
import Btn from "../Btn";
import { ChevronDown, Search, Phone } from "lucide-react";

const ChatHeader: React.FC = () => {
  return (
    <div className='flex items-center justify-between gap-2 w-full sticky top-0 left-0 bg-white dark:bg-gray-700 shadow-[0_6px_6px_-3px_rgba(0,0,0,0.3)] dark:shadow-[0_6px_6px_-3px_rgba(255,255,255,0.1)] p-4'>
      <Btn
        text='Messages'
        className='text-teal-600 rounded-md p-2 flex items-center gap-1 shadow-[0_1px_10px_rgb(0,0,0,0.2)] shadow-gray-700 dark:shadow-gray-400'
        icon={<ChevronDown size={20} />}
      />
      <div className='flex items-center gap-4'>
        <Btn
          className='text-teal-600 border border-gray-300 dark:border-gray-600 font-medium text-sm p-2 rounded-xl'
          icon={<Search size={20} />}
        />
        <Btn
          className='text-teal-600 shadow-[0_1px_10px_rgb(0,0,0,0.2)] shadow-gray-700 dark:shadow-gray-400 font-medium text-sm p-2 rounded-xl'
          icon={<Phone size={20} />}
        />
      </div>
    </div>
  );
};

export default ChatHeader;
