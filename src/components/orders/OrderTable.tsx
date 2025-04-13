/** @format */

import Btn from "../Btn";
import Table from "../table/Table";

const orderColumns = ["product", "price", "quantity", "Total Amount"];

const productsOrder = [
  {
    id: 1,
    image: "",
    product: "Laptop",
    price: "$1200",
    quantity: 2,
    "Total Amount": "$2400",
  },
  {
    id: 2,
    image: "",
    product: "Smartphone",
    price: "$800",
    quantity: 3,
    "Total Amount": "$2400",
  },
  {
    id: 3,
    image: "",
    product: "Headphones",
    price: "$150",
    quantity: 5,
    "Total Amount": "$750",
  },
  {
    id: 4,
    image: "",
    product: "Smartwatch",
    price: "$250",
    quantity: 1,
    "Total Amount": "$250",
  },
  {
    id: 5,
    image: "",
    product: "Tablet",
    price: "$500",
    quantity: 4,
    "Total Amount": "$2000",
  },
];

const OrderTable = () => {
  return (
    <div>
      {/* Order Table Content */}
      <div className='flex justify-between items-center px-6 py-5 '>
        <h2 className='text-2xl font-semibold dark:text-white'>
          Order #M11986
        </h2>
        <Btn
          path='/orders/1/invoice'
          className={
            "bg-orange-400 text-white font-medium text-sm px-6 py-2.5 rounded-md"
          }
          text='Invoice'
        />
      </div>
      <Table type='product id' columns={orderColumns} data={productsOrder} />
    </div>
  );
};

export default OrderTable;
