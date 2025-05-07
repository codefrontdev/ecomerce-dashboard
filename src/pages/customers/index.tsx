/** @format */

import Nav from "../../components/Nav";
import LayoutTable from "../../components/table/LayoutTable";
import Thead from "../../components/table/Thead";
import { ArrowDownToLine } from "lucide-react";
import CustomerTbody from "../../components/table/CustomerTbody";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useCustomerQuery } from "../../hooks/useCustomerQuery";
import LazyWrapper from "../../components/common/LazyWrapper";
import Pagination from "../../components/Pagination";



const customerColumns = [
    "checkbox",
    "costomer",
    "contact",
    "purchases",
    "Order QTY",
    "address",
    "",
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
  
  const { debouncedFilter, query, setQuery } = useCustomerQuery();
  const users = useSelector((state: RootState) => state.users.users);
  const handlehandlePageChange = (page: number) => {
    setQuery({ ...query, page });
    debouncedFilter({ page });
  };
  return (
    <div className="flex h-full gap-5">
      {/* <LayoutFilters /> */}
      <div className="flex-1 flex flex-col bg-white dark:bg-gray-700 gap-5 px-6 py-5 rounded-lg">
        {/* nav */}
        <Nav
          dataBtn={btnData}
          value={query.search}
          onChange={(e) => debouncedFilter({ search: e.target.value })}
          searchPlaceholder="Search Product..."
        />
        {/* header */}
        {/* <Header dataBtn={btnDataHeader} dataFilters={data} /> */}
        {/* content */}
        <LayoutTable className="border border-gray-200 dark:border-gray-300">
          <Thead columns={customerColumns} />
          <CustomerTbody data={users.users} />
        </LayoutTable>
        {/* footer */}
        <div className="flex justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase font-medium">
            Showing 10 of 100 results
          </p>
          {/* pagination */}
          {users.total > users.pageSize && (
            <LazyWrapper>
              <Pagination
                currentPage={users.page}
                totalPages={users.totalPages}
                onPageChange={handlehandlePageChange}
              />
            </LazyWrapper>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
