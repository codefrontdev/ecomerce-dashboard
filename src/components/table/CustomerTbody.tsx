/** @format */

import { FC, useCallback, useState } from "react";
import { EllipsisVertical, Eye, Trash2 } from "lucide-react";
import ActionModal from "../modals/ActionModal";
import { FiEdit } from "react-icons/fi";
import { User } from "../../types/users";
import { deleteUser } from "../../features/usersSlice";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

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
  data: User[];
}

const CustomerTbody: FC<Props> = ({ data }) => {
  const [openModalId, setOpenModalId] = useState<string | null>(null);

  console.log(data);

   const dispatch: AppDispatch = useDispatch();
  
    const deleteHandler = useCallback(
      (id: string) => {
        dispatch(deleteUser(id))
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
    <tbody>
      {data &&
        data.map((item) => (
          <tr
            key={item.id}
            className="bg-white text-gray-900 font-normal dark:text-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td className="px-4">
              <div className="flex items-center">
                <input
                  id={`checkbox-${item.id}`}
                  type="checkbox"
                  className="w-4 h-4 p-2 appearance-none bg-gray-100 rounded-sm focus:ring-amber-500 border border-gray-300 dark:focus:ring-amber-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 checked:bg-amber-600 dark:bg-gray-700 shadow-sm dark:border-gray-600"
                />
                <label htmlFor={`checkbox-${item.id}`} className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope="row"
              className="p-4 dark:text-white flex items-center gap-4"
            >
              {item?.profilePicture?.url && (
                <div className="overflow-hidden w-8 h-8 rounded-md">
                  <img
                    loading="lazy"
                    src={item?.profilePicture?.url || ""}
                    alt={`${item.firstName} ${item.lastName}`.slice(0, 5)}
                  />
                </div>
              )}
              <div className="flex flex-col gap-1">
                {item.firstName} {item.lastName}
                <span className="text-gray-400 text-[10px] font-medium uppercase">
                  id: {item.id.slice(0, 5)}
                </span>
              </div>
            </th>
            <td className="p-4 font-medium ">
              <div className="flex flex-col">
                {item?.email}
                <span className="text-gray-400 text-[10px] font-medium uppercase">
                  {item.phone || "No phone"}
                </span>
              </div>
            </td>
            {/* إجمالي قيمة الطلبات التي قام بها المستخدم */}
            <td className="px-4 py-4">
              $
              {item.orders
                ?.reduce(
                  (acc, order) => acc + parseFloat(order.total.toString()),
                  0
                )
                .toFixed(2)}
            </td>

            {/* عدد الطلبات التي قام بها المستخدم */}
            <td className="p-4 font-medium">
              <div className="flex gap-1">
                <span>{item.orders?.length || 0}</span>
                <span>Orders</span>
              </div>
            </td>

            <td className="p-4 font-medium">{item.address || "No address"}</td>
            <td className="p-4">
              <div
                className="relative"
                onClick={() =>
                  setOpenModalId(openModalId === item.id ? null : item.id)
                }
              >
                <div className="text-gray-500 dark:bg-gray-950 p-1 border border-gray-300 bg-gray-50 rounded-md cursor-pointer flex items-center justify-center">
                  <EllipsisVertical size={16} />
                  <ActionModal
                    id={item.id}
                    isOpen={openModalId === item.id}
                    onClose={() => setOpenModalId(null)}
                    actions={
                      actions.map((action) => ({
                        ...action,
                        onClick:
                          action.label === "Delete"
                            ? () => deleteHandler(item.id)
                            : action.onClick,
                      }))
                    }
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
