/** @format */

import { FC } from "react";

interface TheadProps {
  columns: string[];
}

const Thead: FC<TheadProps> = ({ columns }) => {
  return (
    <thead className='text-xs w-full border-b border-gray-300 dark:border-gray-600 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-2xl'>
      <tr className="">
        {columns.map((col, index) => (
          <th key={index} scope='col' className='py-4 px-4 w-fit'>
            {col.toLowerCase() === "checkbox" ? (
              <div className='flex items-center'>
                  <input
                    id='checkbox-all-search'
                    type='checkbox'
                    className='w-4 h-4 p-2 appearance-none bg-gray-100 rounded-sm focus:ring-amber-500 border border-gray-300  dark:focus:ring-amber-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 checked:bg-amber-600 dark:bg-gray-700 shadow-sm dark:border-gray-600'
                    />
                  <label htmlFor='checkbox-all-search' className='sr-only'>
                    checkbox
                  </label>
                </div>
            ) : (
              col
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Thead;
