/** @format */
import React, { FC, useCallback, useState } from "react";
import { EllipsisVertical, Eye, Trash2 } from "lucide-react";
import { FiEdit } from "react-icons/fi";
const ActionModal = React.lazy(() => import("../modals/ActionModal"));
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { toast } from "react-toastify";
import { Category } from "../../types/category";
import { deleteCategory } from "../../features/categoriesSlice";

interface Props {
  data: any;
}

const actions = [
  {
    label: "Edit",
    onClick: () => console.log(`Edit action for category `),
    icon: <FiEdit size={20} />,
    path: `/categories/:id/edit`,
  },
  {
    label: "Preview",
    onClick: () => console.log(`Preview action for category `),
    icon: <Eye size={20} />,
    path: `/categories/:id/details`,
  },
  {
    label: "Delete",
    onClick: () => console.log(`Delete action for category `),
    icon: <Trash2 size={20} />,
    path: null,
  },
];

const CategoryTbody: FC<Props> = React.memo(({ data }) => {
  const [openModalId, setOpenModalId] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();

  const deleteCategoryHandler = useCallback(
    (id: string) => {
      dispatch(deleteCategory(id))
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
      {data?.map((item: Category) => {
        return (
          <tr
            key={item.id}
            className='bg-white text-gray-900 font-normal dark:text-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'>
            <td className='px-4'>
              <div className='flex items-center'>
                <input
                  id='checkbox-all-search'
                  type='checkbox'
                  className='w-4 h-4 p-2 appearance-none bg-gray-100 rounded-sm focus:ring-amber-500 border border-gray-300 dark:focus:ring-amber-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 checked:bg-amber-600 dark:bg-gray-700 shadow-sm dark:border-gray-600'
                />
                <label htmlFor='checkbox-all-search' className='sr-only'>
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope='row'
              className='p-4 dark:text-white flex items-center gap-4'>
              <div className='overflow-hidden w-8 h-8 rounded-md'>
                <img
                  src={item.image?.url}
                  alt={item.name.slice(0, 5)}
                  loading='lazy'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='flex flex-col gap-1'>
                {item.name}
                
              </div>
                </th>
                
            <td className='p-4 font-medium'>{item.description}</td>
            <td className='p-4 font-medium'>{item.status}</td>
            <td className='p-4 font-medium'>{item.tags?.map((tag) => tag).join(", ")}</td>
            <td className='p-4 font-medium'>{item.createdAt}</td>
            <td className='p-4 font-medium'>{item.updatedAt}</td>
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
                          ? () => deleteCategoryHandler(item.id)
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

export default CategoryTbody;
