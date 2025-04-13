/** @format */

// components/ProfileHeader.tsx
import { FC } from "react";
import Avatar from "../../assets/avatar.png";

interface ProfileHeaderProps {
  isCollapsed: boolean;
  name: string;
  online?: boolean;
}

const ProfileHeader: FC<ProfileHeaderProps> = ({
  isCollapsed,
  name,
  online,
}) => {
  return (
    <div className='flex flex-col items-center py-5'>
      <img
        loading='lazy'
        className={`p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 transition-all ${
          isCollapsed ? "w-10 h-10" : "w-16 h-16 scale-100"
        }`}
        src={Avatar}
        alt='User avatar'
      />
      {!isCollapsed && (
        <>
          <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
            {name}
          </h5>
          <span className='text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600 font-medium text-sm px-4 py-1 rounded-xl'>
            {online && (
              <span className='bg-green-400 rounded-full w-2 h-2 inline-block mr-1'></span>
            )}
            Online
          </span>
        </>
      )}
    </div>
  );
};

export default ProfileHeader;
