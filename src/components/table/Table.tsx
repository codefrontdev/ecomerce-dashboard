/** @format */

import { FC } from "react";
import Thead from "./Thead";
import Tbody from "./Tbody";

interface TableProps<T> {
  type: string;
  columns: string[];
  data: T[];
}

const Table: FC<TableProps<any>> = ({ columns, data, type }) => {
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-300 dark:border-gray-600'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <Thead columns={columns} />
        <Tbody type={type} columns={columns} data={data} />
      </table>
    </div>
  );
};

export default Table;
