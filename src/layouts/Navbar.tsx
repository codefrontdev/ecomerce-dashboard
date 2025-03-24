/** @format */

import { Bell, Moon, Search, ShoppingCart, Sun, X } from "lucide-react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useEffect, useState } from "react";
import NotificationList from "../components/NotifacationList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

import {
  addNotification,
  setLoading,
  setError,
  NotificationType,
} from "../features/notificationsSlice";
const mockNotifications = [
  {
    id: 1,
    title: "Notification 1",
    message: "Notification 1",
    type: "info" as NotificationType,
    read: false,
  },
  {
    id: 2,
    title: "Notification 2",
    message: "Notification 2",
    type: "error" as NotificationType,
    read: false,
  },
  {
    id: 3,
    title: "Notification 3",
    message: "Notification 3",
    type: "success" as NotificationType,
    read: false,
  },
  {
    id: 4,
    title: "Notification 4",
    message: "Notification 4",
    type: "warning" as NotificationType,
    read: false,
  },
  {
    id: 5,
    title: "Notification 5",
    message: "Notification 5",
    type: "info" as NotificationType,
    read: false,
  },
  {
    id: 6,
    title: "Notification 6",
    message: "Notification 6",
    type: "error" as NotificationType,
    read: false,
  },
  {
    id: 7,
    title: "Notification 7",
    message: "Notification 7",
    type: "success" as NotificationType,
    read: false,
  }
];





const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const className = "flex items-center gap-4";
  const { toggleHandler, theme } = useTheme();
  const user = {
    name: "John Doe",
    avatar: "https://avatars.githubusercontent.com/u/47231161?v=4",
    role: "Admin",
  };

  const [openNotifications, setOpenNotifications] = useState<boolean>(false);
  
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );

  const fetchNotifications = async () => {
      dispatch(setLoading(true));
      try {
        // في المستقبل، يمكن استبدال هذا بـ API حقيقي
        const response = { data: mockNotifications }; // احصل على الإشعارات هنا
        response.data.forEach((notification) => {
          dispatch(addNotification(notification));
        });
        dispatch(setLoading(false));
      } catch (err) {
        dispatch(setError("Failed to fetch notifications"));
        dispatch(setLoading(false));
      }
    };

    

  useEffect(() => {
    fetchNotifications();
  }, [dispatch]);

  return (
    <div className='flex justify-between items-center pr-10 py-5'>
      <div className={className}>
        <HiOutlineMenuAlt2 size={25} className='cursor-pointer text-teal-700' />
        <h1 className='text-3xl font-semibold dark:text-white capitalize'>
          {location.pathname === "/"
            ? "Dashboard"
            : "Dashboard > " + location.pathname.slice(1)}
        </h1>
      </div>
      <div className={className}>
        <div className={className}>
          <Search size={25} className='cursor-pointer text-teal-700' />
          <div
            className='relative'
            onClick={() => setOpenNotifications(!openNotifications)}>
          {notifications.length > 0 &&  <span className='absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-red-500 text-[10px] text-white flex items-center justify-center rounded-full'>
              {notifications.length}
            </span>}
            <Bell size={25} className='cursor-pointer text-teal-700' />
            {openNotifications && (
              <div className='absolute left-0 top-12 bg-white dark:bg-gray-700 shadow-lg rounded-lg w-64 p-4 z-10'>
                <div className='relative border-b border-gray-400 dark:border-gray-600 pb-2 flex justify-between'>
                  <h3 className='text-xl font-semibold dark:text-white'>Notifications</h3>
                  <hr />
                  <button
                    className='absolute top-0 right-0 cursor-pointer text-red-500 hover:underline'
                    onClick={() => setOpenNotifications(false)}>
                    <X size={20} />
                  </button>
                </div>
                <NotificationList notifications={notifications} />
              </div>
            )}
          </div>

          <div className='' onClick={toggleHandler}>
            {theme === "dark" ? (
              <Moon size={25} className='cursor-pointer text-teal-700' />
            ) : (
              <Sun size={25} className='cursor-pointer text-teal-700' />
            )}
          </div>
          <div className='relative'>
            <span className='absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-[#15cab8] text-[10px] text-white flex items-center justify-center rounded-full'>
              3
            </span>
            <Link to='/cart'>
              <ShoppingCart
                size={25}
                className='cursor-pointer text-teal-700'
              />
            </Link>
          </div>
        </div>
        <div className='w-px h-10 bg-teal-700 mx-5' />
        <div className='flex items-center gap-3'>
          <img
            src='https://avatars.githubusercontent.com/u/47231161?v=4'
            alt='profile'
            width={40}
            height={40}
            className='rounded-full cursor-pointer'
          />
          <div className='flex flex-col'>
            <span className='text-sm font-semibold dark:text-white'>
              {user.name}
            </span>
            <span className='text-xs text-gray-400'>{user.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
