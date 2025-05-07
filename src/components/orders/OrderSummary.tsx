/** @format */

import { FC, ReactNode } from "react";



interface OrderSummaryProps {
  title?: string;
  inputWithBtn: boolean;
  btn: ReactNode;
  data: {
    title: string,
    value: string
  }[]
}
const OrderSummary: FC<OrderSummaryProps> = ({ title, btn, inputWithBtn, data }) => {
  
 const subTotal = parseFloat(
   data
     .find((item) => item.title === "Sub Total")
     ?.value.replace(/[^\d.-]/g, "") || "0"
 );

 const discountValue = parseFloat(
   data
     .find((item) => item.title === "Discount")
     ?.value.replace(/[^\d.-]/g, "") || "0"
 );

 const shippingCharge = parseFloat(
   data
     .find((item) => item.title === "Shipping charge")
     ?.value.replace(/[^\d.-]/g, "") || "0"
 );

 const estimatedTax = parseFloat(
   data
     .find((item) => item.title === "estimated tax")
     ?.value.replace(/[^\d.-]/g, "") || "0"
 );

  const totalUSD = (
    subTotal -
    discountValue +
    shippingCharge +
    estimatedTax
  ).toFixed(2);


  return (
    <div>
      {/* Order Summary Content */}
      {title && (
        <h2 className="text-2xl font-semibold dark:text-white">{title}</h2>
      )}

      <div className="mt-3">
        {data.map((item, i) => (
          <div
            className="flex justify-between items-center border-b p-2 border-gray-300 dark:border-gray-600"
            key={i}
          >
            <span className="text-[11px] uppercase font-medium text-gray-500 dark:text-gray-400">
              {item.title}
            </span>
            <small className="font-medium text-[12px] dark:text-white">
              {item.value}
            </small>
          </div>
        ))}
        {/* total */}
        <div className="flex justify-between items-center p-2">
          <span className="text-[11px] uppercase font-medium text-gray-500 dark:text-gray-400">
            Total (USD)
          </span>
          <small className="font-medium text-[12px] dark:text-white">
            ${totalUSD}
          </small>
        </div>
      </div>
      {inputWithBtn ? (
        <div className="">
          {/* <InputField 
            btn={btn} 
            placeholder='Entre Discount Code' 
            name='discountCode' 
            errors={{}} 
          /> */}
        </div>
      ) : (
        btn
      )}
    </div>
  );
};

export default OrderSummary;
