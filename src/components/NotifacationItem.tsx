/** @format */

import { FC } from "react";
import { Notification } from "../features/notificationsSlice";

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: FC<NotificationItemProps> = ({ notification }) => {
  return (
    <li className={`py-4 ${notification.read ? "bg-gray-100" : ""}`}>
      <div className='flex justify-between'>
        <div>
          <h4 className='font-semibold'>{notification.title}</h4>
          <p>{notification.message}</p>
        </div>
        <div className='flex flex-col'>
          <span className='text-xs text-gray-500'>{notification.type}</span>
          {!notification.read && (
            <span className='ml-2 text-xs text-red-500'>New</span>
          )}
        </div>
      </div>
    </li>
  );
};

export default NotificationItem;
