import { useCallback, useEffect, useMemo, useState } from "react";
import { debounce, pickBy } from "lodash";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { getAllUsers } from "../features/usersSlice";

export interface CustomerQuery {
  page: number;
  pageSize: number;
  search: string;
}

const defaultQuery: CustomerQuery = {
  page: 1,
  pageSize: 10,
  search: "",
};

export const useCustomerQuery = () => {
  const [query, setQuery] = useState<CustomerQuery>(defaultQuery);
  const dispatch = useDispatch<AppDispatch>();

  const queryParams = useMemo(() => ({ ...query }), [query]);

  useEffect(() => {
    const validQueryParams = pickBy(
      queryParams,
      (value) => value && (typeof value === "string" ? value.length > 0 : true)
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

    dispatch(getAllUsers({ query: `?${queryString}` }));
  }, [query, dispatch]);

  const debouncedFilter = useCallback(
    debounce((filter: Partial<CustomerQuery>) => {
      setQuery((prev) => ({ ...prev, ...filter }));
    }, 300),
    []
  );

  return { query, setQuery, debouncedFilter };
};
