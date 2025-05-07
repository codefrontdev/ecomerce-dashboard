import { FC } from "react";

interface TbodyProps<T> {
  type: string;
  columns: string[];
  data: T[];
  checkbox?: boolean;
}

const Tbody: FC<TbodyProps<any>> = ({ columns, data, type, checkbox }) => {
  const renderColumnValue = (column: string, row: any) => {
    switch (column) {
      case "product":
        return row.product ? (
          <div className="flex items-center">
            {row.product.image && (
              <img
                loading="lazy"
                src={row.product.image.url}
                alt={row.product.name}
                className="w-10 h-10 mr-2 object-cover rounded-lg"
              />
            )}
            <div>
              <span>{row.product.name}</span>
              <br />
              <small className="text-gray-500 uppercase">
                Product ID: {row.product.id}
              </small>
            </div>
          </div>
        ) : (
          "No Product"
        );
      case "Total Amount":
        return row.price && row.quantity ? (
          <div>${(parseFloat(row.price) * row.quantity).toFixed(2)}</div>
        ) : (
          "N/A"
        );
      case "price":
        return `$${row.price}`;
      default:
        return row[column] || "N/A"; // إذا لم يوجد القيمة
    }
  };

  return (
    <tbody>
      {data.map((row) => (
        <tr
          key={row.id}
          className="bg-white border-b dark:bg-gray-800 font-medium text-gray-900 dark:text-gray-100 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          {checkbox && (
            <td className="px-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 p-2 appearance-none bg-gray-100 rounded-sm focus:ring-amber-500 border border-gray-300  dark:focus:ring-amber-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 checked:bg-amber-600 dark:bg-gray-700 shadow-sm dark:border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
          )}
          {columns.map((column, colIndex) => (
            <td key={colIndex} className="px-4 py-4">
              {renderColumnValue(column, row)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default Tbody;
