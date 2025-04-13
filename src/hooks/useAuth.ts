/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  signOut } from "../features/authSlice";
import { AppDispatch, RootState } from "../redux/store";

export const useAuth = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user, status, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );


  useEffect(() => {
    if (!user && isAuthenticated) {
      // dispatch(myAccount());
    }
  }, [
    user,
    isAuthenticated,
    dispatch,
  ]);

  return {
    user,
    status,
    error,
    isAuthenticated,
    signOut: () => dispatch(signOut()),
  };
};
