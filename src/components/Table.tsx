
import { FC } from "react";
import Thead from "./table/Thead";
import Tbody from "./table/Tbody"; 

interface TableProps<T> {
  type: string;
  columns: string[];
  data: T[];
}

const Table: FC<TableProps<any>> = ({ columns, data, type }) => {
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <Thead columns={columns} />
        <Tbody type={type} columns={columns} data={data} />{" "}
      </table>
    </div>
  );
};

export default Table;
