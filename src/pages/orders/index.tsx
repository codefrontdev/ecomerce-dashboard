/** @format */

import { ArrowDownToLine, Funnel } from "lucide-react";
import Nav from "../../components/Nav";
import Header, { DataBtn } from "../../components/Header";
import OrderCard from "../../components/orders/OrderCard";
import { MdOutlineLibraryAddCheck, MdOutlineListAlt } from "react-icons/md";
import { LuArrowLeftRight } from "react-icons/lu";
import { FiLoader } from "react-icons/fi";
import { FaBarsProgress } from "react-icons/fa6";
import { TbCancel, TbShoppingCartCancel } from "react-icons/tb";
import { AiOutlineWarning } from "react-icons/ai";
import LayoutTable from "../../components/table/LayoutTable";
import Thead from "../../components/table/Thead";
import OrderTbody from "../../components/table/OrderTbody";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOrders } from "../../features/ordersSlice";
import { useOrderQuery } from "../../hooks/useOrdersQuery";
import LazyWrapper from "../../components/common/LazyWrapper";
import Pagination from "../../components/Pagination";

type StatusType = "New" | "Canceled" | "In Progress" | "Completed";

export interface OrderData {
  id: number;
  customer: string;
  amount: string;
  paymentMethod: string;
  date: string;
  status: StatusType;
}

const orderData: OrderData[] = [
  {
    id: 1,
    customer: "John Doe",
    amount: "$250.00",
    paymentMethod: "Credit Card",
    date: "Apr 01, 2023",
    status: "New" as StatusType,
  },
  {
    id: 2,
    customer: "Alice Smith",
    amount: "$125.50",
    paymentMethod: "PayPal",
    date: "Apr 02, 2023",
    status: "In Progress" as StatusType,
  },
  {
    id: 3,
    customer: "Michael Brown",
    amount: "$89.99",
    paymentMethod: "Bank Transfer",
    date: "Apr 03, 2023",
    status: "Completed" as StatusType,
  },
  {
    id: 4,
    customer: "Emma Johnson",
    amount: "$300.75",
    paymentMethod: "Cash",
    date: "Apr 04, 2023",
    status: "Canceled" as StatusType,
  },
  {
    id: 5,
    customer: "William Davis",
    amount: "$410.20",
    paymentMethod: "Credit Card",
    date: "Apr 05, 2023",
    status: "New" as StatusType,
  },
  {
    id: 6,
    customer: "Sophia Wilson",
    amount: "$99.95",
    paymentMethod: "PayPal",
    date: "Apr 06, 2023",
    status: "Completed" as StatusType,
  },
  {
    id: 7,
    customer: "James Martinez",
    amount: "$215.30",
    paymentMethod: "Bank Transfer",
    date: "Apr 07, 2023",
    status: "In Progress" as StatusType,
  },
  {
    id: 8,
    customer: "Olivia Garcia",
    amount: "$178.00",
    paymentMethod: "Cash",
    date: "Apr 08, 2023",
    status: "Canceled" as StatusType,
  },
  {
    id: 9,
    customer: "Benjamin Miller",
    amount: "$50.00",
    paymentMethod: "Credit Card",
    date: "Apr 09, 2023",
    status: "New" as StatusType,
  },
  {
    id: 10,
    customer: "Charlotte Wilson",
    amount: "$320.40",
    paymentMethod: "PayPal",
    date: "Apr 10, 2023",
    status: "Completed" as StatusType,
  },
];

const dataFilters = (data: Record<string, number>) => [
  {
    id: 1,
    name: "All Orders",
    items: data.total || 0,
  },
  {
    id: 2,
    name: "Delivered",
    items: data.progress || 0,
  },
  {
    id: 3,
    name: "Pickup",
    items: data.pending || 0,
  },
  {
    id: 4,
    name: "Cancelled",
    items: data.canceled || 0,
  },
];

const btnData = [
  {
    text: "Export",
    className:
      "bg-gray-50 text-teal-700 flex items-center gap-2 border border-gray-300 font-medium text-sm px-4 py-2.5 rounded-md",
    icon: <ArrowDownToLine size={16} />,
  },
  {
    path: "/orders/create-order",
    text: "Create Order",
    className:
      "bg-orange-400 text-white font-medium text-sm px-6 py-2.5 rounded-md",
  },
];

const btnDataFilter: DataBtn = {
  text: "Filters",
  icon: <Funnel size={20} />,
};

const mapOrderStatuses = (data: Record<string, number>) => [
  {
    icon: <MdOutlineListAlt className="text-teal-600" size={25} />,
    label: "All Orders",
    value: data.total || 0,
  },
  {
    icon: <FiLoader className="text-teal-600" size={25} />,
    label: "Pending",
    value: data.pending || 0,
  },
  {
    icon: <MdOutlineLibraryAddCheck className="text-teal-600" size={25} />,
    label: "Completed",
    value: data.completed || 0,
  },
  {
    icon: <FaBarsProgress className="text-teal-600" size={25} />,
    label: "Progress",
    value: data.progress || 0,
  },
];

const mapOrderFailed = (data: Record<string, number>) => [
  {
    icon: <TbShoppingCartCancel className="text-teal-600" size={25} />,
    label: "Abanded",
    value: data.abanded || 0,
  },
  {
    icon: <LuArrowLeftRight className="text-teal-600" size={25} />,
    label: "Returned",
    value: data.returned || 0,
  },
  {
    icon: <TbCancel className="text-teal-600" size={25} />,
    label: "Canceled",
    value: data.canceled || 0,
  },
  {
    icon: <AiOutlineWarning className="text-teal-600" size={25} />,
    label: "Damaged",
    value: data.damaged || 0,
  },
];
const orderColumns = [
  "Checkbox",
  "Order Id",
  "Customer",
  "Amount",
  " Payment Method",
  "Order Date",
  "Status",
  "",
];

const OrdersPage = () => {
  const { orders, loading, error } = useSelector(
    (state: RootState) => state.orders
  );
  const { query, setQuery, debouncedFilter } = useOrderQuery();

  console.log(orders);

  const OrderStatuses = mapOrderStatuses(orders.orderStatusCounts.succeeded);
  const OrderFailed = mapOrderFailed(orders.orderStatusCounts.failed);
  const OrderFilters = dataFilters({
    total: orders.orderStatusCounts.succeeded.total,
    pending: orders.orderStatusCounts.succeeded.pending,
    completed: orders.orderStatusCounts.succeeded.completed,
    progress: orders.orderStatusCounts.succeeded.progress,
    canceled: orders.orderStatusCounts.failed.canceled,
  });

  const handlehandlePageChange = (page: number) => {
    setQuery({ ...query, page });
    debouncedFilter({ page });
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-3 bg-teal-400 p-4 rounded-xl">
          <h2 className="font-normal text-base uppercase text-white">
            order statuses
          </h2>
          <OrderCard data={OrderStatuses} />
        </div>
        <div className="flex flex-col gap-3 bg-blue-400 p-4 rounded-xl">
          <h2 className="font-normal text-base uppercase text-white">
            Failed orders
          </h2>
          <OrderCard data={OrderFailed} />
        </div>
      </div>
      <div className="flex flex-col bg-white dark:bg-gray-700 gap-5 px-6 py-5 rounded-lg">
        <Nav
          value={query.search}
          onChange={(e) => debouncedFilter({ search: e.target.value })}
          dataBtn={btnData}
          searchPlaceholder="Search Order..."
        />
        <Header dataBtn={[btnDataFilter]} dataFilters={OrderFilters} />
        <LayoutTable>
          <Thead columns={orderColumns} />
          {orders.data.length === 0 && (
            <tbody>
              <tr>
                <td colSpan={8} className="text-center">
                  No orders found
                </td>
              </tr>
            </tbody>
          )}
          {loading && (
            <tbody>
              <tr>
                <td colSpan={8} className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          )}
          {orders.data.length > 0 && <OrderTbody data={orders.data} />}
        </LayoutTable>
      </div>

      <div className="flex justify-between mt-4">
        <p className="text-sm text-gray-500 dark:text-gray-400 uppercase font-medium">
          Showing {orders.pageSize} of {orders.total} results
        </p>
        {orders.total > orders.pageSize && (
          <LazyWrapper>
            <Pagination
              currentPage={orders.page}
              totalPages={orders.totalPages}
              onPageChange={handlehandlePageChange}
            />
          </LazyWrapper>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
