
import React, { FC, useCallback, useState } from "react";
import { EllipsisVertical, Eye, Trash2 } from "lucide-react";
import { FiEdit } from "react-icons/fi";
const ActionModal = React.lazy(() => import("../modals/ActionModal"));
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { toast } from "react-toastify";
import { Brand } from "../../types/brand"; 
import { deleteBrand } from "../../features/brandsSlice";

interface Props {
  data: Brand[];
}

const BrandTbody: FC<Props> = React.memo(({ data }) => {
  const [openModalId, setOpenModalId] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();

  const deleteBrandHandler = useCallback(
    (id: string) => {
      dispatch(deleteBrand(id))
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
      {data?.map((item) => (
        <tr
          key={item.id}
          className='bg-white text-gray-900 font-normal dark:text-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'>
          <td className='px-4'>
            <div className='flex items-center'>
              <input
                type='checkbox'
                className='w-4 h-4 appearance-none bg-gray-100 rounded-sm focus:ring-amber-500 border border-gray-300 dark:focus:ring-amber-600 dark:bg-gray-700 shadow-sm dark:border-gray-600'
              />
            </div>
          </td>
          <th scope='row' className='p-4 flex items-center gap-4'>
            <div className='overflow-hidden w-8 h-8 rounded-md'>
              <img
                src={item.logo?.url}
                alt={item.name.slice(0, 5)}
                loading='lazy'
                className='w-full h-full object-cover'
              />
            </div>
            <span>{item.name}</span>
          </th>
          <td className='p-4 font-medium'>
            {item.logo ? "Yes" : "No"}
          </td>
          <td className='p-4 font-medium'>
            {new Date(item.createdAt).toLocaleDateString()}
          </td>
          <td className='p-4 font-medium'>
            {new Date(item.updatedAt).toLocaleDateString()}
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
                  id={item.id}
                  isOpen={openModalId === item.id}
                  onClose={() => setOpenModalId(null)}
                  actions={[
                    {
                      label: "Edit",
                      icon: <FiEdit size={20} />,
                      path: `/brands/${item.id}/edit`,
                      onClick: () => {}, // يمكن استخدام router هنا
                    },
                    {
                      label: "Preview",
                      icon: <Eye size={20} />,
                      path: `/brands/${item.id}/details`,
                      onClick: () => {},
                    },
                    {
                      label: "Delete",
                      icon: <Trash2 size={20} />,
                      path: null,
                      onClick: () => deleteBrandHandler(item.id),
                    },
                  ]}
                />
              </div>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
});

export default BrandTbody;
