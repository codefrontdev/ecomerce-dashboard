/** @format */

import { FC, ReactNode } from "react";
// import Btn from "../Btn";
// import InputField from "../fields/InputField";

const data = [
  {
    title: "Sub Total",
    value: "11488.96",
  },
  {
    title: "Discount",
    value: "60.00",
  },
  {
    title: "Shipping charge",
    value: "15.00",
  },
  {
    title: "estimated tax",
    value: "00.00",
  },
];

interface OrderSummaryProps {
  title?: string;
  inputWithBtn: boolean;
  btn: ReactNode;
}
const OrderSummary: FC<OrderSummaryProps> = ({ title, btn, inputWithBtn }) => {
  return (
    <div>
      {/* Order Summary Content */}
      {title && (
        <h2 className='text-2xl font-semibold dark:text-white'>{title}</h2>
      )}

      <div className='mt-3'>
        {data.map((item, i) => (
          <div
            className='flex justify-between items-center border-b p-2 border-gray-300 dark:border-gray-600'
            key={i}>
            <span className='text-[11px] uppercase font-medium text-gray-500 dark:text-gray-400'>
              {item.title}
            </span>
            <small className='font-medium text-[12px] dark:text-white'>
              ${item.value}
            </small>
          </div>
        ))}
        {/* total */}
        <div className='flex justify-between items-center p-2'>
          <span className='text-[11px] uppercase font-medium text-gray-500 dark:text-gray-400'>
            Total (USD)
          </span>
          <small className='font-medium text-[12px] dark:text-white'>
            14.000
          </small>
        </div>
      </div>
      {inputWithBtn ? (
        <div className=''>
          {/* <InputField 
            btn={btn} 
            placeholder='Entre Discount Code' 
            name='discountCode' 
            errors={{}} 
          /> */}
        </div>
      ): (
        btn
      )}
    </div>
  );
};

export default OrderSummary;
