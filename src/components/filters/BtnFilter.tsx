import React from 'react'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';


interface Props {
    isActive: boolean;
    handleClick: () => void;
    text: string;
}

const BtnFilter: React.FC<Props> = ({isActive, handleClick, text}) => {
  return (
    <button
      type='button'
      className='flex justify-between items-center gap-2 cursor-pointer'
      onClick={handleClick}>
      <h3 className='dark:text-white text-2xl font-medium'>category</h3>
      {isActive ? (
        <IoIosArrowDown className='text-gray-600 dark:text-gray-300' />
      ) : (
        <IoIosArrowForward className='text-gray-600 dark:text-gray-300' />
      )}
    </button>
  );
}

export default BtnFilter