import { FC } from "react";


interface TheadProps {
    columns: string[]
}

const Thead: FC<TheadProps> = ({columns}) => {
  return (
    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
      <tr>
        {columns.map((col, index) => (
          <th key={index} scope='col' className='px-6 py-3'>
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead