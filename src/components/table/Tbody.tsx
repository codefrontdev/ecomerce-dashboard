
import { FC } from "react";

interface TbodyProps<T> {
  type: string
  columns: string[];
  data: T[];
}

const Tbody: FC<TbodyProps<any>> = ({ columns, data, type }) => {
  const columnMap: { [key: string]: string } = {
    id: "id",
    "Product Name": "name",
    Price: "price",
    status: "status",
    sold: "sold",
    "total earning": "totalEarning",
    image: "image",
  };

  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr
          key={rowIndex}
          className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'>
          {columns.map((column, colIndex) => {
            // البحث عن الخاصية المناسبة في الكائن بناءً على اسم العمود
            const columnKey = columnMap[column];
            return (
              <td key={colIndex} className='px-6 py-4'>
                {columnKey ? (
                  columnKey === "name" ? (
                    // دمج الصورة مع اسم المنتج في عمود "Product Name"
                    <div className='flex items-center'>
                      <img
                        src={row.image}
                        alt={row.name}
                        className='w-10 h-10 mr-2 object-cover rounded-lg'
                      />
                      <div>
                        <span>{row[columnKey as keyof typeof row]}</span>
                        <br />
                        <small className='text-gray-500 uppercase'>{type}: {row.id}</small>
                      </div>
                    </div>
                  ) : (
                    row[columnKey as keyof typeof row] || "N/A"
                  )
                ) : (
                  "N/A"
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default Tbody;
