import React, { FC } from 'react'

interface Data {
    icon: React.ReactNode;
    label: string;
    value: string;
}

interface OrderCardProps {
    data: Data[]
}


const OrderCard: FC<OrderCardProps> = ({data}) => {

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 p-4 border bg-[#fafaf2] dark:bg-[#161615] border-gray-300 rounded-xl gap-4'>
      {data.map((stat, index) => (
        <div key={index} className='flex flex-col justify-center items-center'>
          <div className='flex items-center gap-2'>
            {stat.icon}
            <span className='text-2xl font-bold dark:text-white'>
              {stat.value}
            </span>
          </div>
          <small className='text-gray-400 font-medium uppercase'>
            {stat.label}
          </small>
        </div>
      ))}
    </div>
  );
}

export default OrderCard