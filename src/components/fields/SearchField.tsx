import { Search } from 'lucide-react';
import { FC } from 'react';

interface SearchFieldProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SearchField: FC<SearchFieldProps> = ({ placeholder, value, onChange }) => {
  return (
    <div className='relative flex-1 border border-gray-300 rounded-lg text-gray-400'>
      <Search className='absolute top-2 left-2' />
      <input
        type='text'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='w-full p-2 ml-2 pl-8 text-gray-500 dark:text-gray-100 rounded-md focus:outline-none'
      />
    </div>
  );
};

export default SearchField