/** @format */

import React from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import BtnFilter from "./BtnFilter";
import { Active } from "../../layouts/LayoutFilters";
const data = [
  "Clothing",
  "Lingerie & Nightwear",
  "Body Fit",
  "Sportswear",
  "Accessories",
];


interface CategoryFilterProps {
  active: Active | undefined;
  setActive: (active: Active) => void;
}
const CategoryFilter: React.FC<CategoryFilterProps> = ({active, setActive}) => {
  
  return (
    <div className='flex flex-col gap-4 w-full'>
      <BtnFilter isActive={active === "category"} handleClick={() => setActive("category")} text='category' />
      {active === "category" &&
        data.map((item, index) => (
          <div key={index} className='flex items-center gap-4'>
            <div className='flex items-center justify-center border rounded-md border-gray-300 w-4.5 h-4.5 p-px'>
              <input
                className='w-4 h-3.5 appearance-none rounded-md checked:shadow-[0_0_0_2px_transparent,0_0_0_4px_rgb(214 221 215),0_0_0_4px_rgb(28 148 45)] checked:bg-amber-600 checked: checked:border-gray-300 outline-none checked:outline-2 checked:outline-gray-400  focus:ring-amber-500'
                type='checkbox'
                value=''
                id='flexCheckDefault'
              />
            </div>
            <label
              className='form-check-label font-medium dark:text-white'
              htmlFor='flexCheckDefault'>
              {item}
            </label>
          </div>
        ))}
    </div>
  );
};

export default CategoryFilter;
