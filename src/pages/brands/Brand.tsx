import { FC, useEffect } from "react";
import Btn from "../../components/Btn";
import { FiEdit } from "react-icons/fi";
import { BiSolidShoppingBags } from "react-icons/bi";
import { LuWalletMinimal } from "react-icons/lu";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBrandById } from "../../features/brandsSlice";

interface BrandProps {
  id: string;
  name: string;
  logo?: {
    publicId: string;
    url: string;
  };
  totalProducts: number;
  totalRevenue: number;
}

const BrandDetails: FC<BrandProps> = ({ name, id, logo }) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-semibold dark:text-white">{name}</h2>
          <span className="text-gray-500 dark:text-gray-300 text-xs uppercase font-medium">
            Brand ID: {id}
          </span>
        </div>
        <Btn
          icon={<FiEdit />}
          path={`/brands/${id}/edit`}
          text="Edit"
          className="bg-gray-100 dark:bg-gray-700 text-teal-700 flex items-center gap-2 border border-gray-300 dark:border-gray-600 font-medium text-sm px-4 py-2 rounded-md"
        />
      </div>

      {logo && (
        <div className="flex justify-center mt-4">
          <img
            src={logo.url}
            alt={`${name} logo`}
            className="w-32 h-32 object-contain rounded-md border border-gray-200 dark:border-gray-600"
          />
        </div>
      )}
    </div>
  );
};

const BrandStats: FC<{ totalProducts: number; totalRevenue: number }> = ({
  totalProducts,
  totalRevenue,
}) => {
  const stats = [
    {
      icon: <BiSolidShoppingBags className="text-teal-600" size={24} />,
      label: "Total Products",
      value: totalProducts,
    },
    {
      icon: <LuWalletMinimal className="text-teal-600" size={24} />,
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md flex flex-col items-center"
        >
          <div className="flex items-center gap-3">
            {stat.icon}
            <span className="text-2xl font-semibold dark:text-white">
              {stat.value}
            </span>
          </div>
          <small className="text-gray-500 dark:text-gray-300 uppercase mt-2">
            {stat.label}
          </small>
        </div>
      ))}
    </div>
  );
};

const Brand: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.brands.brand);

  useEffect(() => {
    if (id) {
      dispatch(getBrandById(id));
    }
  }, [dispatch, id]);

  return (
    <div className="flex-1 p-5 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {data && (
          <>
            <BrandDetails
              id={data.id}
              name={data.name}
              logo={data.logo}
              totalProducts={data.products?.length || 0}
              totalRevenue={0} // يمكن التعديل لاحقًا
            />

            <BrandStats
              totalProducts={data.products?.length || 0}
              totalRevenue={0}
            />

            <div className="flex justify-end gap-2 mt-6">
              <Btn
                text="Add Product"
                className="bg-orange-500 hover:bg-orange-600 transition text-white h-10 flex items-center gap-2 font-medium text-sm px-4 py-2.5 rounded-md"
              />
              <Btn
                text="Export"
                className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition text-teal-700 h-10 flex items-center gap-2 font-medium text-sm px-4 py-2.5 rounded-md"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Brand;
