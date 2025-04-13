/** @format */

import { FC, useState } from "react";
import { EllipsisVertical, Eye, Trash2 } from "lucide-react";
import ActionModal from "../modals/ActionModal";
import { FiEdit } from "react-icons/fi";

 const actions = [
   {
     label: "Edit",
     onClick: () => console.log(`Edit action for user `),
     icon: <FiEdit size={20} />,
     path: `/customers/:id/edit`,
   },
   {
     label: "Preview",
     onClick: () => console.log(`Preview action for user `),
     icon: <Eye size={20} />,
     path: `/customers/:id/details`,
   },
   {
     label: "Delete",
     onClick: () => console.log(`Delete action for user `),
     icon: <Trash2 size={20} />,
     path: null,
   },
 ];

interface Props {
  data: any[];
}

const CustomerTbody: FC<Props> = ({ data }) => {
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
          <th
            scope='row'
            className='p-4 dark:text-white flex items-center gap-4'>
            {item.image && (
              <div className='overflow-hidden w-8 h-8 rounded-md'>
                <img
                  loading='lazy'
                  src={item.image}
                  alt={item.customer.slice(0, 5)}
                />
              </div>
            )}
            <div className='flex flex-col gap-1'>
              {item.customer}
              <span className='text-gray-400 text-[10px] font-medium uppercase'>
                id: {item.id}
              </span>
            </div>
          </th>
          <td className='p-4 font-medium '>
            <div className='flex flex-col'>
              {item.contact.map((contactItem: string, i: number) => (
                <span
                  key={i}
                  className='text-sm text-gray-400 last:text-orange-500'>
                  {contactItem}
                </span>
              ))}
            </div>
          </td>
          <td className='px-4 py-4'>${item.purchases}</td>
          <td className='p-4 font-medium'>{item.orderQty} Order</td>
          <td className='p-4 font-medium'>{item.address}</td>
          <td className='p-4'>
            <div
              className='relative'
              onClick={() =>
                setOpenModalId(openModalId === item.id ? null : item.id)
              }>
              <div className='text-gray-500 dark:bg-gray-950 p-1 border border-gray-300 bg-gray-50 rounded-md cursor-pointer flex items-center justify-center'>
                <EllipsisVertical size={16} />
                <ActionModal
                  id={item.id}
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

export default CustomerTbody;
