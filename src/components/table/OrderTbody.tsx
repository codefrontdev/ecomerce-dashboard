/** @format */

import { FC, useState } from "react";
import { OrderData } from "../../pages/orders";
import { EllipsisVertical, Eye, Trash2 } from "lucide-react";
import Btn from "../Btn";
import ActionModal from "../modals/ActionModal";
import { FiEdit } from "react-icons/fi";

interface OrderTbodyProps {
  data: OrderData[];
}



 const actions = [
   {
     label: "Edit",
     onClick: () => console.log(`Edit action for user `),
     icon: <FiEdit size={20} />,
     path: `/orders/:id/`,
   },
   {
     label: "Preview",
     onClick: () => console.log(`Preview action for user `),
     icon: <Eye size={20} />,
     path: `/orders/:id/details`,
   },
   {
     label: "Invoice",
     onClick: () => console.log(`Preview action for user `),
     icon: <Eye size={20} />,
     path: `/orders/:id/invoice`,
   },
   {
     label: "Delete",
     onClick: () => console.log(`Delete action for user `),
     icon: <Trash2 size={20} />,
     path: null,
   },
 ];


const OrderTbody: FC<OrderTbodyProps> = ({ data }) => {
  
      const [openModalId, setOpenModalId] = useState<number | null>(null);
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

          <td className='p-4 font-medium'>{item.id}</td>

          <td className='p-4 font-medium'>{item.customer}</td>

          <td className='px-4 py-4'>{item.amount}</td>

          <td className='p-4 font-medium'>{item.paymentMethod}</td>

          <td className='p-4 font-medium'>{item.date}</td>

          <td className='p-4'>
            <Btn
              className={`${
                item.status === "New"
                  ? "bg-[#d2f7f4] border-[#45d5c6]"
                  : item.status === "Canceled"
                  ? "bg-[#fff3f4] border-[#e64f49]"
                  : item.status === "In Progress"
                  ? "bg-[#fff7d2] border-[#f4d645]"
                  : item.status === "Completed"
                  ? "bg-[#e1f9e6] border-[#46d64f]"
                  : ""
              } text-teal-700 flex min-w-fit items-center gap-2 border-2 font-medium text-sm px-5 max-w-24 py-1 rounded-lg`}
              text={item.status}
            />
          </td>

          <td className='p-4'>
            <div
              className='relative'
              onClick={() =>
                setOpenModalId(openModalId === item.id ? null : item.id)
              }>
              <div className='text-gray-500 dark:bg-gray-950 p-1 border border-gray-300 bg-gray-50 rounded-md cursor-pointer flex items-center justify-center'>
                <EllipsisVertical size={16} />
                <ActionModal
                  id={item.id.toString()}
                  isOpen={openModalId === item.id}
                  onClose={() => setOpenModalId(null)}
                  actions={actions}
                />
              </div>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default OrderTbody;
