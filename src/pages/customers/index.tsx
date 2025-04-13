/** @format */

import Nav from "../../components/Nav";
import LayoutTable from "../../components/table/LayoutTable";
import Thead from "../../components/table/Thead";
import { ArrowDownToLine } from "lucide-react";
import CustomerTbody from "../../components/table/CustomerTbody";



const customerColumns = [
    "checkbox",
    "costomer",
    "contact",
    "purchases",
    "Order QTY",
    "address",
    "",
];

const customersData = [
  {
    id: 1,
    customer: "Maren Dias",
    contact: ["maren@example.com", "+62 819 1314 1435"],
    purchases: 300,
    orderQty: 2,
    address: "2972 Westheimer Rd, Santa Ana, Illinois 58345",
  },
  {
    id: 2,
    customer: "Alice Johnson",
    contact: ["alice.j@example.com", "+1 234 567 8901"],
    purchases: 150,
    orderQty: 1,
    address: "123 Maple St, Springfield, Illinois 62704",
  },
  {
    id: 3,
    customer: "Robert Brown",
    contact: ["robert.b@example.com", "+44 7700 900123"],
    purchases: 420,
    orderQty: 3,
    address: "456 Oak Ave, London, NW1 6XE, UK",
  },
  {
    id: 4,
    customer: "Emily Davis",
    contact: ["emily.d@example.com", "+61 412 345 678"],
    purchases: 250,
    orderQty: 2,
    address: "789 Pine Rd, Sydney, NSW 2000, Australia",
  },
  {
    id: 5,
    customer: "Michael Miller",
    contact: ["michael.m@example.com", "+1 987 654 3210"],
    purchases: 500,
    orderQty: 4,
    address: "321 Birch Ln, Dallas, Texas 75201",
  },
  {
    id: 6,
    customer: "Sarah Wilson",
    contact: ["sarah.w@example.com", "+49 151 23456789"],
    purchases: 100,
    orderQty: 1,
    address: "654 Cedar St, Berlin, 10115, Germany",
  },
  {
    id: 7,
    customer: "David Lee",
    contact: ["david.l@example.com", "+81 90 1234 5678"],
    purchases: 350,
    orderQty: 2,
    address: "987 Cherry Blvd, Tokyo, 100-0001, Japan",
  },
  {
    id: 8,
    customer: "Olivia Martinez",
    contact: ["olivia.m@example.com", "+34 600 123 456"],
    purchases: 275,
    orderQty: 3,
    address: "159 Elm St, Madrid, 28001, Spain",
  },
  {
    id: 9,
    customer: "James Smith",
    contact: ["james.s@example.com", "+1 555 123 4567"],
    purchases: 600,
    orderQty: 5,
    address: "753 Willow Rd, New York, NY 10001, USA",
  },
  {
    id: 10,
    customer: "Sophia Taylor",
    contact: ["sophia.t@example.com", "+1 444 987 6543"],
    purchases: 200,
    orderQty: 2,
    address: "852 Walnut Ave, Los Angeles, CA 90001, USA",
  },
];

const btnData = [
  {
    text: "Export Customers",
    className:
      "bg-gray-50 text-teal-700 flex items-center gap-2 border border-gray-300 font-medium text-sm px-4 py-2.5 rounded-md",
    icon: <ArrowDownToLine size={16} />,
  },
  {
    path: "/customers/create-customer",
    text: "Add Customer",
    className:
      "bg-orange-400 text-white font-medium text-sm px-6 py-2.5 rounded-md",
  },
];

const CustomersPage = () => {
  return (
    <div className='flex gap-5'>
      {/* <LayoutFilters /> */}
      <div className='flex-1 flex flex-col bg-white dark:bg-gray-700 gap-5 px-6 py-5 rounded-lg'>
        {/* nav */}
        <Nav dataBtn={btnData} searchPlaceholder='Search Product...' />
        {/* header */}
        {/* <Header dataBtn={btnDataHeader} dataFilters={data} /> */}
        {/* content */}
        <LayoutTable className='border border-gray-200 dark:border-gray-300'>
          <Thead columns={customerColumns} />
          <CustomerTbody data={customersData} />
        </LayoutTable>
        {/* footer */}
        <div className='flex justify-between'>
          <p className='text-sm text-gray-500 dark:text-gray-400 uppercase font-medium'>
            Showing 10 of 100 results
          </p>
          {/* pagination */}
          <div className='inline-flex items-center -space-x-px'></div>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
