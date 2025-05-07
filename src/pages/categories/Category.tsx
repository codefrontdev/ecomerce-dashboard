/** @format */

import Btn from "../../components/Btn";
import { FiEdit } from "react-icons/fi";
import { BiSolidShoppingBags } from "react-icons/bi";
import { LuWalletMinimal } from "react-icons/lu";
import { FC } from "react";

interface CategoryDetailsProps {
  name: string;
  id: string;
  desc: string;
  status: string;
  tags: string[];
}

const CategoryDetails: FC<CategoryDetailsProps> = ({ name, id, desc, status, tags }) => {
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-semibold dark:text-white">{name}</h2>
          <span className="text-gray-500 dark:text-gray-300 text-xs uppercase font-medium">
            Category id: {id}
          </span>
        </div>
        <Btn
          icon={<FiEdit />}
          path={`/categories/${id}/edit`}
          text="Edit"
          className="bg-gray-50 border dark:bg-gray-800 text-teal-700 flex items-center gap-2 border-gray-300 dark:border-gray-600 font-medium text-sm px-4 py-2 rounded-md"
        />
      </div>
      <h3 className="text-gray-900 mt-6 dark:text-gray-100 uppercase font-medium">
        CATEGORY DESCRIPTION
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mt-2 text-[13px]">
        {desc}
      </p>
      <div className="mt-4">
        <h3 className="text-gray-900 dark:text-gray-100 uppercase font-medium">Status</h3>
        <p className={`text-${status === 'active' ? 'green' : 'red'}-600`}>{status}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-gray-900 dark:text-gray-100 uppercase font-medium">Tags</h3>
        <ul className="text-gray-500 dark:text-gray-400 mt-2">
          {tags.map((tag, index) => (
            <li key={index} className="inline-block mr-2 mb-2 bg-gray-200 dark:bg-gray-600 px-3 py-1 rounded-full">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

interface CategoryStatsProps {
  totalProducts: number;
  totalRevenue: number;
}

const CategoryStats: FC<CategoryStatsProps> = ({ totalProducts, totalRevenue }) => {
  const stats = [
    {
      icon: <BiSolidShoppingBags className="text-teal-600" size={25} />,
      label: "Total Products",
      value: totalProducts,
    },
    {
      icon: <LuWalletMinimal className="text-teal-600" size={25} />,
      label: "Total Revenue",
      value: totalRevenue,
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 p-4 border border-gray-300 rounded-xl gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="flex flex-col justify-center items-center">
          <div className="flex items-center gap-2">
            {stat.icon}
            <span className="text-2xl dark:text-white">${stat.value}</span>
          </div>
          <small className="text-gray-400 uppercase">{stat.label}</small>
        </div>
      ))}
    </div>
  );
};

const Category = () => {
  return (
    <div className="flex-1 flex bg-white dark:bg-gray-700 gap-5 rounded-lg p-5">
      <div className="flex-1 flex flex-col gap-4 w-full">
        <CategoryDetails
          name="Clothing"
          id="Cat12345"
          desc="Fashion, seasonal clothing for all ages, sizes, and occasions."
          status="active"
          tags={['Fashion', 'Summer', 'Sale']}
        />
        <CategoryStats totalProducts={120} totalRevenue={50000} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="flex items-end gap-2">
            <Btn
              text="Add Product"
              className="bg-orange-400 border h-10 text-white flex items-center gap-2 border-gray-300 dark:border-gray-600 font-medium text-sm px-4 py-2.5 rounded-md"
            />
            <Btn
              text="Export"
              className="bg-gray-50 border h-10 dark:bg-gray-800 text-teal-700 flex items-center gap-2 border-gray-300 dark:border-gray-600 font-medium text-sm px-4 py-2.5 rounded-md"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 border border-gray-300 rounded-xl">
          <div className="p-5">
            <h3 className="text-gray-900 dark:text-gray-100 uppercase font-medium">
              Category Description
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
              Fashionable clothing for all ages. Summer specials with great discounts.
            </p>
          </div>
          <div className="w-full h-px bg-gray-300" />
          <div className="p-5">
            <h3 className="text-gray-900 dark:text-gray-100 uppercase font-medium">
              Additional Information
            </h3>
            <div className="overflow-x-auto rounded-2xl border-collapse border border-gray-300 dark:border-gray-600 w-fit">
              <table className="rounded-2xl border-collapse border border-gray-300 dark:border-gray-300">
                <tbody className="bg-gray-100 dark:bg-gray-800">
                  <tr className="border border-gray-300 dark:border-gray-700">
                    <th className="py-2 px-4 text-left dark:text-white border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 font-medium">
                      Category Name
                    </th>
                    <td className="py-2 px-4 text-gray-400">Clothing</td>
                  </tr>
                  <tr className="border border-gray-300 dark:border-gray-700">
                    <th className="py-2 px-4 text-left dark:text-white border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 font-medium">
                      Description
                    </th>
                    <td className="py-2 px-4 text-gray-400">
                      Fashionable clothing for all ages, sizes, and occasions.
                    </td>
                  </tr>
                  <tr className="border border-gray-300 dark:border-gray-600">
                    <th className="py-2 px-4 text-left dark:text-white border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 font-medium">
                      Tags
                    </th>
                    <td className="py-2 px-4 text-gray-400">Fashion, Summer, Sale</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
