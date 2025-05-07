// hooks/useOrderQuery.ts
import { useCallback, useEffect, useMemo, useState } from "react";
import { debounce, pickBy } from "lodash";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { getOrders } from "../features/ordersSlice";

export interface OrderQuery {
  page: number;
  pageSize: number;
  status: string;
  search: string;
  sort: string;
  customer: string;
  minTotal: number;
  maxTotal: number;
}

const defaultOrderQuery: OrderQuery = {
  page: 1,
  pageSize: 10,
  status: "",
  search: "",
  sort: "",
  customer: "",
  minTotal: 0,
  maxTotal: 0,
};

export const useOrderQuery = () => {
  const [query, setQuery] = useState<OrderQuery>(defaultOrderQuery);
  const dispatch = useDispatch<AppDispatch>();

  const queryParams = useMemo(() => {
    return {
      ...query,
      status: query.status === "all" ? "" : query.status,
    };
  }, [query]);

  useEffect(() => {
    const validQueryParams = pickBy(queryParams, (value) =>
      typeof value === "string" ? value.trim() !== "" : value !== 0
    );

    const queryString = new URLSearchParams(
      Object.entries(validQueryParams).reduce((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    if (window.location.search !== `?${queryString}`) {
      window.history.pushState({}, "", `?${queryString}`);
    }

    dispatch(getOrders({ query: `?${queryString}` }));
  }, [query]);

  const debouncedFilter = useCallback(
    debounce((filter: Partial<OrderQuery>) => {
      setQuery((prev) => ({ ...prev, ...filter }));
    }, 300),
    []
  );

  return {
    query,
    setQuery,
    debouncedFilter,
  };
};
