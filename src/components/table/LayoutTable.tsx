/** @format */

import { FC } from "react";

interface Props {
  children?: React.ReactNode;
  className?: string
}

const LayoutTable: FC<Props> = ({ children, className }) => {
  return (
    <div className={`relative overflow-auto h-full sm:rounded-lg ${className}`}>
      <table className='table-auto border-collapse w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        {children}
      </table>
    </div>
  );
};

export default LayoutTable;
