
import { FC, useState } from "react";

interface ProductColorsProps {
    colors: string[];
}

const ProductColors: FC<ProductColorsProps> = ({ colors }) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  return (
    <div>
      <span className='text-gray-500 dark:text-gray-400 uppercase'>Colors:</span>
      <div className='flex items-center gap-2 mt-2'>
        {colors.map((color, index) => (
          <div
            key={index}
            style={{ borderColor: selectedColor === color ? color : "" }}
            className={`cursor-pointer rounded-lg w-8 h-8 border-1 flex justify-center items-center transition ${
              selectedColor === color
                ? `scale-110`
                : "border-gray-400"
            }`}
            onClick={() => setSelectedColor(color)}>
            <div
              className='w-6 h-6 rounded-lg'
              style={{ backgroundColor: color }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};


export default ProductColors