/** @format */

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { setTheme, toggleTheme } from "../features/themeSlice";

export const useTheme = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.theme.mode);
  return {
    theme,
    toggleHandler: () => dispatch(toggleTheme()),
    setTheme: (mode: "dark" | "light") => dispatch(setTheme(mode)),
  };
};
