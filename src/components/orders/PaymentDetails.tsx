/** @format */

import { FC } from "react";

/** @format */
interface PaymentProps {
  className?: string;
  transactions?: string;
  paymentMethod?: string;
  cardHolderName: string;
  cardNumber: string;
}
const PaymentDetails: FC<PaymentProps> = ({
  transactions,
  paymentMethod,
  cardHolderName,
  cardNumber,
  className,
}) => {
  const paymentDetails = {
    transactions: transactions,
    paymentMethod: paymentMethod,
    cardHolderName: cardHolderName,
    cardNumber: cardNumber,
  };

  return (
    <div className='bg-white dark:bg-gray-700'>
      {/* العنوان */}
      <h2 className='text-lg font-semibold dark:text-white mb-1'>
        Payment Details
      </h2>

      {/* عرض تفاصيل الدفع */}
      <div className='space-y-1'>
        {Object.entries(paymentDetails).map(([key, value]) => {
          if (!value) return;
          return (
            <div key={key} className={`grid grid-cols-2 ${className}`}>
              <span className='text-gray-500 dark:text-gray-300 font-medium text-[12px] uppercase'>
                {key.replace(/([A-Z])/g, " $1")}:
              </span>
              <small className='text-gray-900 dark:text-white line-clamp-1 font-medium'>
                {value}
              </small>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentDetails;
