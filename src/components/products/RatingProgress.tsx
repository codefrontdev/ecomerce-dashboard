/** @format */

import { FC } from "react";


interface RatingProgressProps {
    rating: number;
    count: number;
    total: number;
}

const RatingProgress: FC<RatingProgressProps> = ({ rating, count, total }) => {
  const percentage = (count / total) * 100;

  const colors: { [key: number]: string } = {
    5: "bg-green-500",
    4: "bg-blue-500",
    3: "bg-yellow-500",
    2: "bg-orange-500",
    1: "bg-red-500",
  };


  return (
    <div className='flex items-center gap-2'>
      <span className='w-6 text-gray-500 dark:text-gray-300 font-medium'>
        {rating}★
      </span>
      <div className='w-full h-2 bg-gray-300 dark:bg-gray-500 border border-gray-400 dark:border-gray-600 rounded-lg overflow-hidden'>
        <div
          className={`h-full ${colors[rating]} rounded-lg`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className='w-12 text-right text-gray-500 dark:text-gray-400'>{count}</span>
    </div>
  );
};

export default RatingProgress;