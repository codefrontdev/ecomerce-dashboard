/** @format */

const Btn = lazy(() => import("../../components/Btn"));
import { FiEdit } from "react-icons/fi";
import { IoStorefrontOutline } from "react-icons/io5";
import { BiSolidShoppingBags } from "react-icons/bi";
import { MdOutlinePriceChange } from "react-icons/md";
import { LuWalletMinimal } from "react-icons/lu";
const ProductColors = lazy(
  () => import("../../components/products/ProductColor")
);
const Rating = lazy(() => import("../../components/products/Rating"));
import { FC, lazy } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import LazyWrapper from "../../components/common/LazyWrapper";

interface ImagesProps {
  images: string[];
  imgDemo: string;
}

const ProductImages: FC<ImagesProps> = ({ images, imgDemo }) => (
  <div className="flex-1 flex flex-col gap-5 max-w-1/3">
    <div className="w-full h-96 rounded-2xl overflow-hidden">
      <img
        loading="lazy"
        className="w-full h-full object-cover"
        src={imgDemo}
        alt=""
      />
    </div>
    <div className="grid grid-cols-3 gap-4 h-32">
      {images.map((_, index) => (
        <img
          loading="lazy"
          key={index}
          className="w-full h-full object-cover rounded-2xl overflow-hidden"
          src="images.jp"
          alt=""
        />
      ))}
    </div>
  </div>
);

interface ProductDetailsProps {
  name: string;
  id: string;
  desc: string;
}
const ProductDetails: FC<ProductDetailsProps> = ({ name, id, desc }) => {
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-semibold dark:text-white">{name}</h2>
          <span className="text-gray-500 dark:text-gray-300 text-xs uppercase font-medium">
            Product id: {id}
          </span>
        </div>
        <Btn
          icon={<FiEdit />}
          path="/products/1/edit"
          text="Edit"
          className="bg-gray-50 border dark:bg-gray-800 text-teal-700 flex items-center gap-2 border-gray-300 dark:border-gray-600 font-medium text-sm px-4 py-2 rounded-md"
        />
      </div>
      <h3 className="text-gray-900 mt-6 dark:text-gray-100 uppercase font-medium">
        PRODUCT SHORT DESCRIPTION
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mt-2 text-[13px]">
        {desc}
      </p>
    </div>
  );
};

interface ProductStatsProps {
  price: number;
  orders: number;
  availableStocks: number;
  totalRevenue: number;
}

const ProductStats: FC<ProductStatsProps> = ({
  price,
  orders,
  availableStocks,
  totalRevenue,
}) => {
  const stats = [
    {
      icon: <MdOutlinePriceChange className="text-teal-600" size={25} />,
      label: "Price",
      value: price,
    },
    {
      icon: <BiSolidShoppingBags className="text-teal-600" size={25} />,
      label: "Orders",
      value: orders,
    },
    {
      icon: <IoStorefrontOutline className="text-teal-600" size={25} />,
      label: "Available Stocks",
      value: availableStocks,
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

const Product = () => {
  const availableColors = ["#479d88", "#edcbb9", "#c7cacc", "#ff8ed6"];
  return (
    <div className="flex-1 flex bg-white dark:bg-gray-700 gap-5 rounded-lg p-5">
      <LazyWrapper>
        <ProductImages images={[""]} imgDemo="" />
      </LazyWrapper>
      <div className="flex-1 flex flex-col gap-4 w-full">
        <LazyWrapper>
          <ProductDetails
            name="Cotton Rich jersey Blazer"
            id="Gy345912"
            desc="  Nec ultrices dui sapien eget. Duis ut diam quam nulla porttitor
          massa id neque aliquam. Condimentum id venenatis a condimentum
          Integer feugiat scelerisque varius morbi enim nunc faucibus a
          pellentesque."
          />

          <ProductStats
            price={120.4}
            orders={120}
            availableStocks={120}
            totalRevenue={120}
          />
        </LazyWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="flex items-end gap-2">
            <LazyWrapper>
              <Btn
                text="1,4"
                className="bg-orange-400 border h-10 text-white flex items-center gap-2 border-gray-300 dark:border-gray-600 font-medium text-sm px-4 py-2.5 rounded-md"
              />
              <Btn
                text="1,4"
                className="bg-gray-50 border h-10 dark:bg-gray-800 text-teal-700 flex items-center gap-2 border-gray-300 dark:border-gray-600 font-medium text-sm px-4 py-2.5 rounded-md"
              />
              <Btn
                text="1,4"
                className="bg-gray-50 border h-10 dark:bg-gray-800 text-teal-700 flex items-center gap-2 border-gray-300 dark:border-gray-600 font-medium text-sm px-4 py-2.5 rounded-md"
              />
            </LazyWrapper>
          </div>
          <LazyWrapper>
            <ProductColors colors={availableColors} />
          </LazyWrapper>
        </div>
        <div className="flex flex-col gap-1 border border-gray-300 rounded-xl ">
          <div className="p-5">
            <h3 className="text-gray-900 dark:text-gray-100 uppercase font-medium">
              product description
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                Nec ultrices dui sapien eget. Duis ut diam quam nulla porttitor
                massa id nequealiquam. Condimentum id venenatis a condimentum.
                Integer feugiat scelerisque varius morbi enim nunc faucibus a
                pellentesque.
              </p>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                Vestibulum: tristique sollicitudin nion sit amet Semper:
                tristique sollicitudin nibh sit amet Consectetur adipiscing elit
                duis
              </p>
            </div>
          </div>
          <div className="w-full h-px bg-gray-300 " />
          <div className="p-5">
            <h3 className="text-gray-900 dark:text-gray-100 uppercase font-medium">
              Additional Information
            </h3>
            <div className="overflow-x-auto rounded-2xl border-collapse border border-gray-300 dark:border-gray-600 w-fit">
              <table className=" rounded-2xl border-collapse border border-gray-300 dark:border-gray-300">
                <tbody className=" bg-gray-100 dark:bg-gray-800">
                  <tr className="border border-gray-300 dark:border-gray-700">
                    <th className="py-2 px-4 text-left dark:text-white border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 font-medium">
                      Product
                    </th>
                    <td className="py-2 px-4 text-gray-400">
                      Cotton Rich Jersey Slim Blazer
                    </td>
                  </tr>

                  <tr className="border border-gray-300 dark:border-gray-700">
                    <th className="py-2 px-4 text-left dark:text-white border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 font-medium">
                      Item Details
                    </th>
                    <td className="py-2 px-4 text-gray-400">
                      Neck to hemipngth for a size 12:72cm
                    </td>
                  </tr>

                  <tr className="border border-gray-300 dark:border-gray-600">
                    <th className="py-2 px-4 text-left dark:text-white border-r border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 font-medium">
                      Composition
                    </th>
                    <td className="py-2 px-4 text-gray-400">
                      100% polyester, Lining - 55% polyester, 45% viscoso
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="w-full h-px bg-gray-300 " />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 p-5 items-end">
            <Rating />
            <div className="flex flex-col gap-5 dark:text-white">
              <h4>Global Reviews (2,123)</h4>
              <div className="w-full p-2  border border-gray-300 rounded-xl flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3>Anna Richards</h3>
                  <div className="flex items-center gap-1 text-amber-300">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaRegStar />
                  </div>
                </div>
                <p className="text-gray-500 dark:text-gray-300">
                  Great at this price, Product quality and look is awesome
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3].map((_, index) => (
                      <img
                        loading="lazy"
                        key={index}
                        className="w-14 h-14 object-cover rounded-2xl overflow-hidden"
                        src="images.jp"
                        alt=""
                      />
                    ))}
                  </div>
                  <small className="text-gray-400">Mar 23, 2022</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
