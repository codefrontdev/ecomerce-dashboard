/** @format */
import { lazy } from "react";

const LayoutFilters = lazy(() => import("../../layouts/LayoutFilters"));
const Nav = lazy(() => import("../../components/Nav"));
const Header = lazy(() => import("../../components/Header"));
const LayoutTable = lazy(() => import("../../components/table/LayoutTable"));
const Thead = lazy(() => import("../../components/table/Thead"));
const ProductTbody = lazy(() => import("../../components/table/ProductTbody"));
const CardItem = lazy(() => import("../../components/products/CardItem"));

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";
import { useProductQuery } from "../../hooks/useProductQuery";
import { productsListData } from "../../data/products";
import LazyWrapper from "../../components/common/LazyWrapper";
import Pagination from "../../components/Pagination";

const ProductsView = () => {
  const [viewType, setViewType] = useState<"grid" | "list">("list");
  const [currentPage, setCurrentPage] = useState(1);
  
  const products = useSelector((state: RootState) => state.products.products);
  const { query, debouncedFilter } = useProductQuery();

  console.log(query);
  const handleCheckboxChange = (
    title: string,
    value: string,
    checked: boolean
  ) => {
    if (title in query) {
      debouncedFilter({
        [title]: checked
          ? [...(query[title as keyof typeof query] as string[]), value]
          : (query[title as keyof typeof query] as string[]).filter(
              (v) => v !== value
            ),
      });
    }
  };

  const handleRangeChange = (values: { min: number; max: number }) => {
    debouncedFilter(values);
  };

  console.log(viewType);


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    debouncedFilter({ page });
  };
  return (
    <div className='grid grid-cols-12 gap-5 w-full h-full overflow-y-auto'>
      {viewType === "list" && (
        <div className='col-span-3'>
          <LayoutFilters
            handleCheckboxChange={handleCheckboxChange}
            handleRangeChange={handleRangeChange}
          />
        </div>
      )}

      <div
        className={`${
          viewType === "list" ? "col-span-9" : "col-span-12"
        } flex flex-col w-full bg-white dark:bg-gray-700 gap-5 px-6 py-5 rounded-lg`}>
        <LazyWrapper>
          <Nav
            value={query.search}
            onChange={(e) => debouncedFilter({ search: e.target.value })}
            dataBtn={productsListData.btnData}
            searchPlaceholder='Search Product...'
          />
        </LazyWrapper>

        <LazyWrapper>
          <Header
            dataBtn={productsListData.btnDataHeader}
            onViewChange={setViewType}
            currentView={viewType}
            dataFilters={[
              {
                id: 1,
                name: "All",
                items: products.total,
              },
              {
                id: 2,
                name: "Available",
                items: products.productStatusCounts.available,
              },
              {
                id: 3,
                name: "Disabled",
                items: products.productStatusCounts.disabled,
              },
            ]}
          />
        </LazyWrapper>

        {products.total === 0 && viewType === "grid" && (
          <div className='text-sm flex items-center justify-center h-full text-gray-500 dark:text-gray-400 uppercase font-medium'>
            No results found
          </div>
        )}

        {viewType === "list" && products.total > 0 ? (
          <LazyWrapper>
            <LayoutTable>
              <Thead columns={productsListData.productColumns} />
              <ProductTbody data={products.products} />
            </LayoutTable>
          </LazyWrapper>
        ) : (
          <div className='text-sm flex items-center justify-center h-full text-gray-500 dark:text-gray-400 uppercase font-medium'>
            No results found
          </div>
        )}

        {viewType === "grid" && (
          <div className='grid grid-cols-4 gap-5'>
            {products.products.map((item) => (
              <LazyWrapper>
                <CardItem key={item.id} item={item} />
              </LazyWrapper>
            ))}
          </div>
        )}

        <div className='flex justify-between mt-4'>
          <p className='text-sm text-gray-500 dark:text-gray-400 uppercase font-medium'>
            Showing {products.pageSize} of {products.total} results
          </p>
          {/* Pagination can be added here */}
          <Pagination
            currentPage={currentPage}
            totalPages={products.total}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
