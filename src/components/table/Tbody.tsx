/** @format */

import { FC } from "react";

interface TbodyProps<T> {
  type: string;
  columns: string[];
  data: T[];
  checkbox?: boolean;
}

const Tbody: FC<TbodyProps<any>> = ({ columns, data, type, checkbox }) => {
  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr
          key={rowIndex}
          className='bg-white border-b dark:bg-gray-800 font-medium text-gray-900 dark:text-gray-100 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'>
          { checkbox && (<td className='px-4'>
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
          </td>)}
          {columns.map((column, colIndex) => {
            // التحقق من وجود القيمة في الكائن
            const value = row[column as keyof typeof row];

            return (
              <td key={colIndex} className='px-6 py-4'>
                {value ? (
                  type && colIndex === 0 ? (
                    // دمج الصورة مع اسم المنتج في عمود "Product Name"
                    <div className='flex items-center'>
                      <img
                        loading='lazy'
                        src={row["image"]} // يمكننا الوصول مباشرة إلى "image"
                        alt={value}
                        className='w-10 h-10 mr-2 object-cover rounded-lg'
                      />
                      <div>
                        <span>{value}</span>
                        <br />
                        <small className='text-gray-500 uppercase'>
                          {type}: {row.id}
                        </small>
                      </div>
                    </div>
                  ) : (
                    value // عرض القيمة إذا كانت موجودة
                  )
                ) : (
                  "N/A" // في حال لم توجد قيمة
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default Tbody;
