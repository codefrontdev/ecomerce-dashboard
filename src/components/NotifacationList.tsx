/** @format */

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Notification } from "../features/notificationsSlice";
import { useState, useEffect } from "react";
import NotificationItem from "./NotifacationItem";

interface NotificationListProps {
  notifications: Notification[];
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
}) => {
  const loading = useSelector(
    (state: RootState) => state.notifications.loading
  );
  const error = useSelector((state: RootState) => state.notifications.error);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentNotifications, setCurrentNotifications] = useState<
    Notification[]
  >(notifications.slice(0, page * 3));
  const [scrollDirection, setScrollDirection] = useState<
    "down" | "up" | "none"
  >("none");

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const target = e.target as HTMLElement;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;

    const isAtBottom = scrollHeight === scrollTop + clientHeight;
    const isAtTop = scrollTop === 0;

    // تحديد اتجاه التمرير
    if (isAtBottom) {
      setScrollDirection("down");
    } else if (isAtTop) {
      setScrollDirection("up");
    }

    // تحميل المزيد عند التمرير للأسفل
    if (isAtBottom && !loadingMore && notifications.length > page * 3) {
      setLoadingMore(true);
    }

    // إخفاء العناصر عند التمرير للأعلى
    if (isAtTop && page > 1 && scrollDirection === "up") {
      setLoadingMore(true);
      setPage((prevPage) => Math.max(prevPage - 1, 1)); // تقليل الصفحة عند التمرير للأعلى
    }
  };

  useEffect(() => {
    if (loadingMore) {
      setTimeout(() => {
        if (scrollDirection === "down") {
          setCurrentNotifications(
            notifications.slice(page * 3, (page + 1) * 3)
          );
          setPage((prevPage) => prevPage + 1);
        } else if (scrollDirection === "up" && page > 1) {
          // عند التمرير للأعلى
          setCurrentNotifications(
            notifications.slice((page - 2) * 3, (page - 1) * 3)
          );
          setPage((prevPage) => Math.max(prevPage - 1, 1));
        }
        setLoadingMore(false);
      }, 1500);
    }
  }, [loadingMore, page, notifications, scrollDirection]);


  return (
    <div
      className='overflow-y-scroll max-h-40 h-44 dark:text-white'
      onScroll={handleScroll}>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className='text-red-500'>{error}</div>
      ) : (
        <ul>
          {currentNotifications.map((notification, i) => (
            <NotificationItem key={i} notification={notification} />
          ))}
        </ul>
      )}
      {loadingMore && <div>Loading more...</div>}
    </div>
  );
};

export default NotificationList;
