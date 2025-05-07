// hooks/useTopSellingQuery.ts
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { topSellingProducts } from "../features/analyticsSlice";

export const useTopSellingQuery = () => {
  const [sortBy, setSortBy] = useState<"price" | "Sold" | "totalEarning">(
    "price"
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(topSellingProducts(sortBy));
  }, [sortBy, dispatch]);

  return {
    sortBy,
    setSortBy,
  };
};
