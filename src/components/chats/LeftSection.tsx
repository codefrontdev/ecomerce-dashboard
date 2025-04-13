/** @format */

// components/LeftSection.tsx
import { FC } from "react";
import { UserMessage } from "../../pages/chat";
import Btn from "../Btn";
import { EllipsisVertical, Plus } from "lucide-react";
import ProfileHeader from "./ProfileHeader";
import SearchField from "../fields/SearchField";

interface LeftSectionProps {
  isLeftCollapsed: boolean;
  userMessage: UserMessage[];
  selectedUser: UserMessage | null;
  onClick: (userMessage: UserMessage) => void;
}

const LeftSection: FC<LeftSectionProps> = ({
  isLeftCollapsed,
  userMessage,
  selectedUser,
  onClick,
}) => {
  return (
    <div className='w-full flex flex-col items-center gap-10 border-t border-gray-300'>
      {/* عرض بيانات المستخدم الافتراضية (ثابتة في هذا المثال) */}
      <ProfileHeader isCollapsed={isLeftCollapsed} name='John Doe' online />

      {/* مربع البحث */}
      {!isLeftCollapsed && <SearchField placeholder='Search...' onChange={() => {}} value="" />}

      {/* قائمة أدوات المحادثات */}
      <div className='flex justify-between w-full items-center gap-2'>
        {!isLeftCollapsed && (
          <h3 className='text-gray-900 dark:text-gray-100 capitalize font-medium'>
            Recent Chat
          </h3>
        )}
        <div
          className={`flex flex-wrap gap-3 ${
            isLeftCollapsed ? "justify-center" : "justify-between"
          }`}>
          <Btn
            className='text-teal-600 shadow-[0_1px_10px_rgb(0,0,0,0.2)] shadow-gray-700 dark:shadow-gray-400 font-medium text-sm p-2 rounded-xl'
            icon={<Plus size={20} />}
          />
          <Btn
            className='text-teal-600 p-2'
            icon={<EllipsisVertical size={20} />}
          />
        </div>
      </div>

      {/* قائمة المحادثات */}
      {userMessage.map((user) => (
        <div
          onClick={() => onClick(user)}
          className={`flex items-center gap-2 transition-all transform hover:scale-105 w-full cursor-pointer shadow-[0_1px_10px_rgb(0,0,0,0.2)] shadow-gray-700 dark:shadow-gray-400 p-2 rounded-md ${
            user.id === selectedUser?.id && "translate-x-2"
          }`}
          key={user.id}>
          <img
          loading="lazy"
            className={`w-10 h-10 p- rounded-full ring-2 ${
              user.online
                ? "ring-green-300 dark:ring-green-400"
                : "ring-gray-300 dark:ring-gray-500"
            } transition-all`}
            src={user.avatar}
            alt='User avatar'
          />
          {!isLeftCollapsed && (
            <div className='flex flex-col'>
              <h5 className='mb-1 text-sm font-medium text-gray-900 dark:text-white'>
                {user.name}
              </h5>
              <span className='text-xs text-gray-500 dark:text-gray-400'>
                {user.lastMessage}
              </span>
            </div>
          )}
          {!isLeftCollapsed && (
            <span className='text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600 font-medium text-sm px-4 py-1 rounded-xl'>
              {user.date}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default LeftSection;
