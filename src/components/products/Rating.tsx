
import RatingProgress from './RatingProgress';
import { FaRegStar, FaStar } from 'react-icons/fa';

const Rating = () => {
 const totalRatings = 5438; // العدد الكلي للتقييمات
 const ratingsData = [
   { rating: 5, count: 3200 },
   { rating: 4, count: 1500 },
   { rating: 3, count: 500 },
   { rating: 2, count: 150 },
   { rating: 1, count: 88 },
 ];

 return (
   <div className=''>
     <h3 className='text-gray-900 dark:text-gray-100 uppercase font-medium'>
       RATINGS & REVIEWS
     </h3>

     <div className='flex items-center gap-2'>
       <span className='text-2xl text-white bg-cyan-400 px-4 py-2 rounded-xl'>
         4.5
       </span>
       <div>
         <div className='flex items-center gap-1 text-amber-300'>
           <FaStar />
           <FaStar />
           <FaStar />
           <FaStar />
           <FaRegStar />
         </div>
         <span className='text-gray-500 dark:text-gray-400'>
           Based on {totalRatings} Ratings
         </span>
       </div>
     </div>

     <div className='mt-4 space-y-2'>
       {ratingsData.map((data, index) => (
         <RatingProgress
           key={index}
           rating={data.rating}
           count={data.count}
           total={totalRatings}
         />
       ))}
     </div>
   </div>
 );
}

export default Rating