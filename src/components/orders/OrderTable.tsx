/** @format */

import { FC } from "react";
import Table from "../table/Table";
import { OrderItems } from "../../types/orders";

const orderColumns = ["product", "price", "quantity", "Total Amount"];

interface Props {
  productItems: OrderItems[];
  title: string;
  btn: React.ReactNode;
}

const OrderTable: FC<Props> = ({ productItems, title, btn }) => {
  return (
    <div>
      {/* Order Table Content */}
      <div className="flex justify-between items-center px-6 py-5 ">
        <h2 className="text-2xl font-semibold dark:text-white">{title}</h2>
        {btn}
      </div>
      <Table columns={orderColumns} data={productItems} />
    </div>
  );
};

export default OrderTable;
