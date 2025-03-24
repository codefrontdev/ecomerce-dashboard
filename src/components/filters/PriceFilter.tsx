/** @format */

import React from "react";
import BtnFilter from "./BtnFilter";
import { Active } from "../../layouts/LayoutFilters";


interface Props {
    active: Active | undefined;
    setActive: (active: Active) => void;
}

const PriceFilter: React.FC<Props> = ({active, setActive}) => {
 
  return (
    <div>
      <BtnFilter
        isActive={active === "price"}
        handleClick={() => setActive("price")}
        text='price'
      />
      {active === "price" && (
        <div className='relative flex items-center w-full'>
          {/* أيقونة البداية */}
          <span className='absolute left-0 text-gray-600 text-lg'>🔻</span>

          {/* شريط التمرير */}
          <input
            type='range'
            className='w-full h-1 bg-gray-200 appearance-none rounded-md 
      [&::-webkit-slider-thumb]:appearance-none 
      [&::-webkit-slider-thumb]:w-4 
      [&::-webkit-slider-thumb]:h-4 
      [&::-webkit-slider-thumb]:bg-blue-500 
      [&::-webkit-slider-thumb]:rounded-full 
      [&::-webkit-slider-thumb]:cursor-pointer'
          />

          {/* أيقونة النهاية */}
          <span className='absolute right-0 text-gray-600 text-lg'>🔺</span>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
