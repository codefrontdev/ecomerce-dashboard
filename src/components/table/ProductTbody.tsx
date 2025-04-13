/** @format */

import React, { FC, useCallback, useState } from "react";
import Btn from "../Btn";
import { EllipsisVertical, Eye, Trash2 } from "lucide-react";
import { FiEdit } from "react-icons/fi";
const ActionModal = React.lazy(() => import("../modals/ActionModal"));
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../features/productSlice";
import { AppDispatch } from "../../redux/store";
import { toast } from "react-toastify";
import { Product } from "../../types/product";

interface Props {
  data: any;
}

const actions = [
  {
    label: "Edit",
    onClick: () => console.log(`Edit action for user `),
    icon: <FiEdit size={20} />,
    path: `/products/:id/edit`,
  },
  {
    label: "Preview",
    onClick: () => console.log(`Preview action for user `),
    icon: <Eye size={20} />,
    path: `/products/:id/details`,
  },
  {
    label: "Delete",
    onClick: () => console.log(`Delete action for user `),
    icon: <Trash2 size={20} />,
    path: null,
  },
];

const ProductTbody: FC<Props> = React.memo(({ data }) => {
  const [openModalId, setOpenModalId] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();
 
  const deleteProductHandler = useCallback(
    (id: string) => {
      dispatch(deleteProduct(id))
        .unwrap()
        .then((result) => {
          toast.success(result.message);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    },
    [dispatch]
  );
  return (
    <tbody className='w-full'>
      {data?.map((item: Product) => {
        return (
          <tr
            key={item.id}
            className='bg-white text-gray-900 font-normal dark:text-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'>
            <td className='px-4'>
              <div className='flex items-center'>
                <input
                  id='checkbox-all-search'
                  type='checkbox'
                  className='w-4 h-4 p-2 appearance-none bg-gray-100 rounded-sm focus:ring-amber-500 border border-gray-300  dark:focus:ring-amber-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 checked:bg-amber-600 dark:bg-gray-700 shadow-sm dark:border-gray-600'
                />
                <label htmlFor='checkbox-all-search' className='sr-only'>
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope='row'
              className='p-4  dark:text-white flex items-center gap-4'>
              <div className='overflow-hidden w-8 h-8 rounded-md'>
                <img
                  src={item.image?.url}
                  alt={item.name.slice(0, 5)}
                  loading='lazy'
                  className="w-full h-full object-cover"
                />
              </div>
              <div className='flex flex-col gap-1'>
                {item.name}
                <span className='text-gray-400 text-[10px] font-medium uppercase'>
                  Category: {item.category}
                </span>
              </div>
            </th>
            <td className='p-4 font-medium'>${item.price}</td>
            <td className='p-4 font-medium'>{item.stock}</td>
            <td className='p-4 font-medium'>{item.discount}%</td>
            <td className='px-4  py-4'>
              <Btn
                className={`${
                  item.status === "Available" ? "bg-[#d2f7f4]" : "bg-[#fff3f4]"
                } text-teal-700 flex items-center justify-center w-fit gap-2 border-2 ${
                  item.status === "Available"
                    ? "border-[#45d5c6]"
                    : "border-[#e64f49]"
                } font-medium text-sm px-5 w-24 py-1 rounded-lg text-center`}
                text={item.status}
              />
            </td>
            <td className='p-4 font-medium'>{item.attributes?.length}</td>
            <td className='p-4 font-medium'>
              <div className='flex gap-3'>
                <span>{item.colors?.join(",")}:</span>
                <span>{item.sizes?.join(",")}</span>
              </div>
            </td>
            <td className='p-4 font-medium'>{item.created_at}</td>
            <td className='p-4 font-medium'>{item.updated_at}</td>
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
                    actions={actions.map((action) => ({
                      ...action,
                      onClick:
                        action.label === "Delete"
                          ? () => deleteProductHandler(item.id) // تخصيص وظيفة الحذف
                          : action.onClick,
                    }))}
                  />
                </div>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
});

export default ProductTbody;
