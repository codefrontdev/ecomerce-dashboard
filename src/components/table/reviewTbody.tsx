/** @format */

import { FC } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

interface ReviewData {
  id: number;
  type: string;
  product: {
    id: number;
    name: string;
    image: string;
    category: string;
  };
  rating: string;
  review: string;
  author: string;
  submittedOn: string;
}

interface ReviewTbodyProps {
  data: ReviewData[];
}

const ReviewTbody: FC<ReviewTbodyProps> = ({ data }) => {

      const renderStars = (rating: string) => {
        const ratingValue = parseFloat(rating);
        const fullStars = Math.floor(ratingValue);
        const hasHalfStar = ratingValue % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
          <div className='flex text-yellow-500'>
            {[...Array(fullStars)].map((_, i) => (
              <FaStar key={i} fill='currentColor' stroke='none' />
            ))}
            {hasHalfStar && <FaStarHalfAlt fill='currentColor' stroke='none' />}
            {[...Array(emptyStars)].map((_, i) => (
              <FaRegStar
                key={i + fullStars}
                stroke='currentColor'
                fill='none'
              />
            ))}
          </div>
        );
      };

  return (
    <tbody>
      {data.map((item) => (
        <tr
          key={item.id}
          className='bg-white text-gray-900 font-normal dark:text-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'>
          <td className='px-4'>
            <div className='flex items-center'>
              <input
                id={`checkbox-${item.id}`}
                type='checkbox'
                className='w-4 h-4 p-2 appearance-none bg-gray-100 rounded-sm focus:ring-amber-500 border border-gray-300 dark:focus:ring-amber-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 checked:bg-amber-600 dark:bg-gray-700 shadow-sm dark:border-gray-600'
              />
              <label htmlFor={`checkbox-${item.id}`} className='sr-only'>
                checkbox
              </label>
            </div>
          </td>

          <td className='p-4 font-medium'>{item.type}</td>
          <th
            scope='row'
            className='p-4  dark:text-white flex items-center gap-4'>
            <div className='overflow-hidden w-8 h-8 rounded-md'>
              <img
                loading='lazy'
                src={item.product.image}
                alt={item.product.name.slice(0, 5)}
              />
            </div>
            <div className='flex flex-col gap-1'>
              {item.product.name}
              <span className='text-gray-400 text-[10px] font-medium uppercase'>
                Category: {item.product.category}
              </span>
            </div>
          </th>
          <td className='p-4 font-medium'>{renderStars(item.rating)}</td>
          <td className='p-4 font-medium'>{item.review}</td>
          <td className='p-4 font-medium'>{item.author}</td>
          <td className='p-4 font-medium'>{item.submittedOn}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default ReviewTbody;
