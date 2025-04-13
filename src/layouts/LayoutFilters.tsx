/** @format */

import React from "react";
import PriceFilter from "../components/filters/PriceFilter";
import CheckBoxFilter from "../components/filters/CheckBoxFilter";

const categoryData = [
  "Clothing",
  "Lingerie & Nightwear",
  "Body Fit",
  "Sportswear",
  "Accessories",
];

const brandData = ["Nike", "Adidas", "Puma", "Reebok", "Under Armour"];

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
  

  return (
    <div className='flex-1 flex w-full flex-col bg-white dark:bg-gray-700 gap-5 px-6 py-5 rounded-lg'>
      <h2 className='text-2xl font-medium dark:text-white'>Filters</h2>
      <div className='w-full h-px bg-gray-300'></div>

      <CheckBoxFilter
        title={"Category"}
        data={categoryData}
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
        data={brandData}
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
