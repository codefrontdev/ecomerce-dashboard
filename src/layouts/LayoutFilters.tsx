/** @format */

import React from "react";
import PriceFilter from "../components/filters/PriceFilter";
import CheckBoxFilter from "../components/filters/CheckBoxFilter";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";



const colorData = ["Red", "Blue", "Green", "Yellow", "Orange"];

// Removed duplicate FilterProps declaration
interface FilterProps {
  handleCheckboxChange: (
    title: string,
    value: string,
    checked: boolean
  ) => void;
  handleRangeChange: (values: { min: number; max: number }) => void;
}

const LayoutFilters: React.FC<FilterProps> = ({ handleCheckboxChange,handleRangeChange }) => {
  
  const brands = useSelector((state: RootState) => state.brands.brands);
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  )

  return (
    <div className='flex-1 flex w-full flex-col bg-white dark:bg-gray-700 gap-5 px-6 py-5 rounded-lg'>
      <h2 className='text-2xl font-medium dark:text-white'>Filters</h2>
      <div className='w-full h-px bg-gray-300'></div>

      <CheckBoxFilter
        title={"Category"}
        data={categories.categories.map((category) => category.name)}
        onChange={handleCheckboxChange}
      />

      <PriceFilter
        min={0}
        max={1000}
        onChange={(values: { min: number; max: number }) =>
          handleRangeChange(values)
        }
      />

      <CheckBoxFilter
        title={"Brand"}
        data={brands.brands.map((brand) => brand.name)}
        onChange={handleCheckboxChange}
      />

      <CheckBoxFilter
        title={"Color"}
        data={colorData}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};

export default LayoutFilters;
