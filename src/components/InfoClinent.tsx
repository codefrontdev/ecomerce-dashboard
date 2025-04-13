/** @format */

import { useEffect } from "react";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { myAccount } from "../features/authSlice";

const InfoClinent = () => {
  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector(
    (state: RootState) => state.auth.user
  );
  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(myAccount())
    }
  }, [isAuthenticated, user, dispatch]);



  return (
    <div className='flex items-center gap-3'>
      <img
        src={
          user?.profilePicture ||
          "https://avatars.githubusercontent.com/u/47231161?v=4"
          
        }
        loading="lazy"
        alt='profile'
        width={40}
        height={40}
        className='rounded-full cursor-pointer'
      />
      <div className='flex flex-col'>
        <span className='text-sm font-semibold dark:text-white'>
          {user?.name || "User Name"}
        </span>
        <span className='text-xs text-gray-400'>{user?.role}</span>
      </div>
    </div>
  );
};

export default InfoClinent;
