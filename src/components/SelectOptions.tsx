/** @format */

import { FC } from "react";

interface SelectOptionsProps {
  title: string;
  options: string[];
  range: string;
  handleRange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const SelectOptions: FC<SelectOptionsProps> = ({
  title,
  options,
  range,
  handleRange,
}) => {
  return (
    <div className='mb-4 flex justify-between'>
      <h2 className='text-2xl font-medium dark:text-white'>{title}</h2>
      <select
        className='border-none outline-none p-2 rounded-md bg-gray-50 text-gray-400'
        value={range}
        onChange={handleRange}>
        {options.map((item, i) => (
          <option key={i} value={item}>{item}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectOptions;
