/** @format */

import { ArrowDownToLine, Funnel } from "lucide-react";
import Nav from "../../components/Nav";
import Header, { DataBtn } from "../../components/Header";
import OrderCard from "../../components/orders/OrderCard";
import {
  MdOutlineLibraryAddCheck,
  MdOutlineListAlt,
} from "react-icons/md";
import { LuArrowLeftRight } from "react-icons/lu";
import { FiLoader } from "react-icons/fi";
import { FaBarsProgress } from "react-icons/fa6";
import { TbCancel, TbShoppingCartCancel } from "react-icons/tb";
import { AiOutlineWarning } from "react-icons/ai";
import LayoutTable from "../../components/table/LayoutTable";
import Thead from "../../components/table/Thead";
import OrderTbody from "../../components/table/OrderTbody";

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



const dataFilters = [
  {
    id: 1,
    name: "All Orders",
    items:34,
  },
  {
    id: 2,
    name: "Delivered",
    items: 6365,
  },
  {
    id: 3,
    name: "Pickup",
    items: 635,
  },
  {
    id: 4,
    name: "Cancelled",
    items: 365,
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

const OrderStatuses = [
  {
    icon: <MdOutlineListAlt className='text-teal-600' size={25} />,
    label: "All Orders",
    value: "2K",
  },
  {
    icon: <FiLoader className='text-teal-600' size={25} />,
    label: "Pending",
    value: "70",
  },
  {
    icon: <MdOutlineLibraryAddCheck className='text-teal-600' size={25} />,
    label: "Completed",
    value: "120",
  },
  {
    icon: <FaBarsProgress className='text-teal-600' size={25} />,
    label: "Progress",
    value: "60",
  },
];
const OrderFailed = [
  {
    icon: <TbShoppingCartCancel className='text-teal-600' size={25} />,
    label: "Abanded",
    value: "160",
  },
  {
    icon: <LuArrowLeftRight className='text-teal-600' size={25} />,
    label: "Returned",
    value: "70",
  },
  {
    icon: <TbCancel className='text-teal-600' size={25} />,
    label: "Canceled",
    value: "120",
  },
  {
    icon: <AiOutlineWarning className='text-teal-600' size={25} />,
    label: "Damaged",
    value: "35",
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
  return (
    <div className='flex flex-col gap-10'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div className='flex flex-col gap-3 bg-teal-400 p-4 rounded-xl'>
          <h2 className='font-normal text-base uppercase text-white'>
            order statuses
          </h2>
          <OrderCard data={OrderStatuses} />
        </div>
        <div className='flex flex-col gap-3 bg-blue-400 p-4 rounded-xl'>
          <h2 className='font-normal text-base uppercase text-white'>
            Failed orders
          </h2>
          <OrderCard data={OrderFailed} />
        </div>
      </div>
      <div className='flex flex-col bg-white dark:bg-gray-700 gap-5 px-6 py-5 rounded-lg'>
        <Nav dataBtn={btnData} searchPlaceholder='Search Order...' />
        <Header dataBtn={[btnDataFilter]} dataFilters={dataFilters} />
        <LayoutTable>
          <Thead columns={orderColumns} />
          <OrderTbody data={orderData} />
        </LayoutTable>
      </div>
    </div>
  );
};

export default OrdersPage;
