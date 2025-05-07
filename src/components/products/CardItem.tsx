import { FC } from "react";
import Btn from "../Btn";



interface CardItemProps {
    item: any
}

const CardItem: FC<CardItemProps> = ({ item }) => {
  return (
    <div
      key={item}
      className='relative bg-gray-50 dark:bg-gray-800 rounded-lg flex flex-col gap-2'>
      <div className='absolute top-4 left-4'>
        <Btn
          className={`${
            item.status === "Available" ? "bg-[#d2f7f4]" : "bg-[#fff3f4]"
          } text-teal-700 flex items-center gap-2 border-2 ${
            item.status === "Available"
              ? "border-[#45d5c6]"
              : "border-[#e64f49]"
          } font-medium text-sm px-5 w-24 py-1 rounded-lg`}
          text={item.status}
        />
      </div>
      <div className='overflow-hidden w-full '>
        <img loading='lazy' src={item.image.url} alt={item.name.slice(0, 5)} />
      </div>
      <div className='p-4 flex flex-col gap-2'>
        <p className='text-gray-400 text-[10px] font-medium uppercase'>
          {item.category?.name}
        </p>
        <h2 className='font-medium dark:text-white '>{item.name}</h2>
        <div className='flex justify-between'>
          <span className='text-gray-400 font-medium'>{item.createdAt}</span>
          <span className='dark:text-white font-medium'>{item.price}</span>
        </div>
      </div>
    </div>
  );
}

export default CardItem