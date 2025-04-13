/** @format */

// hooks/useProductQuery.ts
import { useCallback, useEffect, useMemo, useState } from "react";
import { debounce, pickBy } from "lodash";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { getAllProducts } from "../features/productSlice";

export interface Query {
  page: number;
  pageSize: number;
  status: string;
  search: string;
  sort: string;
  category: string[];
  color: string[];
  brand: string[];
  max: number;
  min: number;
}

const defaultQuery: Query = {
  page: 1,
  pageSize: 5,
  status: "",
  search: "",
  sort: "",
  category: [],
  color: [],
  brand: [],
  max: 0,
  min: 0,
};

export const useProductQuery = () => {
  const [query, setQuery] = useState<Query>(defaultQuery);
  const dispatch = useDispatch<AppDispatch>();

  const queryParams = useMemo(
    () => ({
      ...query,
      category: query.category.join(","),
      color: query.color.join(","),
      brand: query.brand.join(","),
      maxPrice: query.max,
      minPrice: query.min,
    }),
    [query]
  );

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

    dispatch(getAllProducts({ query: `?${queryString}` }));
  }, [query]);

  const debouncedFilter = useCallback(
    debounce((filter: any) => {
        console.log(filter)
      setQuery((prev) => ({ ...prev, ...filter }));
    }, 300),
    []
  );

  return { query, setQuery, debouncedFilter };
};
