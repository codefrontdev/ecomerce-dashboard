/** @format */

import React from "react";
import BtnFilter from "./BtnFilter";

interface Props {
  title: string;
  data: string[];

  onChange: (title: string, value: string, checked: boolean) => void;
}

const CheckBoxFilter: React.FC<Props> = ({ title, data, onChange }) => {
  const [isActive, setIsActive] = React.useState(false);


  return (
    <div className='flex flex-col gap-3 w-full'>
      <BtnFilter
        isActive={isActive}
        handleClick={() => setIsActive(!isActive)}
        text={title}
      />
      {isActive &&
        data.map((item, index) => (
          <div key={index} className='flex justify-between'>
            <div className='flex items-center gap-4'>
              <input
                onChange={(e) =>
                  onChange(title.toLowerCase(), item, e.target.checked)
                }
                value={item}
                id='checkbox-all-search'
                type='checkbox'
                className='w-4 h-4 p-2 appearance-none bg-gray-100 rounded-sm focus:ring-amber-500 border border-gray-300  dark:focus:ring-amber-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 checked:bg-amber-600 dark:bg-gray-700 shadow-sm dark:border-gray-600'
              />
              <label
                className='form-check-label font-medium dark:text-white'
                htmlFor='flexCheckDefault'>
                {item}
              </label>
            </div>
            <span className='text-gray-400'>{index + 1}00</span>
          </div>
        ))}
    </div>
  );
};

export default CheckBoxFilter;
