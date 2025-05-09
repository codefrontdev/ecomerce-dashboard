/** @format */

import { FC } from "react";
import Btn from "../Btn";
import { FiEdit } from "react-icons/fi";



interface ClientDetailsProps {
  user: {
    fullName: string;
    email: string;
    role: string;
    status: string;
    profilePicture: string;
    phone: string;
    location: string;
  };
}
const ClientDetails: FC<ClientDetailsProps> = ({user}) => {
 
  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold dark:text-white">
          Client Details
        </h2>
        <Btn
          icon={<FiEdit />}
          path="/products/1/edit"
          text="Edit"
          className="bg-gray-50 border  dark:bg-gray-800 text-teal-700 flex items-center gap-2 border-gray-300 dark:border-gray-600 font-medium text-sm px-4 py-2 rounded-md"
        />
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <img
            loading="lazy"
            src={
              user.profilePicture ||
              "https://avatars.githubusercontent.com/u/47231161?v=4"
            }
            alt="profile"
            width={65}
            height={65}
            className="rounded-full cursor-pointer"
          />
          <div className="flex flex-col gap-1">
            <span className="text-xl font-semibold dark:text-white">
              {user.fullName}
            </span>
            <span className="text-base uppercase text-gray-400">{user.role}</span>
          </div>
        </div>
        <div className="mt-3">
          {Object.entries(user).map(([key, value]) => {
            if (typeof value === "object" && value !== null) return null; // تجاهل
            return (
              <div
                className="flex justify-between items-center border-b last:border-0 p-3 border-gray-300 dark:border-gray-600"
                key={key}
              >
                <span className="text-[13px] uppercase font-medium text-gray-500 dark:text-gray-400">
                  {key.replace(/([A-Z])/g, " $1")}:
                </span>
                <small className="font-medium text-[13px] dark:text-white">
                  {value}
                </small>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
