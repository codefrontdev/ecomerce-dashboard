import React from 'react'
import CategoryFilter from '../components/filters/CategoryFilter'
import PriceFilter from '../components/filters/PriceFilter';
export type Active = 'category' | 'price' | 'color' | 'color'
const LayoutFilters = () => {
  const [isActive, setIsActive] = React.useState<Active>();


  const handleActive = (active: Active) => setIsActive(active);
  return (
    <div className='flex flex-col w-1/4 bg-white dark:bg-gray-700 gap-10 p-4 rounded-lg'>
      <h2 className='text-2xl font-medium dark:text-white'>Filters</h2>
      <CategoryFilter active={isActive} setActive={handleActive} />
      <PriceFilter active={isActive} setActive={handleActive} />
    </div>
  );
}

export default LayoutFilters