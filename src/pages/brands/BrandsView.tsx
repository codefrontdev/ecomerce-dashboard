/** @format */
import { lazy, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { brandListData } from "../../data/brands";
import { useBrandQuery } from "../../hooks/useBrandQuery";

const Nav = lazy(() => import("../../components/Nav"));
const LayoutTable = lazy(() => import("../../components/table/LayoutTable"));
const Thead = lazy(() => import("../../components/table/Thead"));
const BrandTbody = lazy(() => import("../../components/table/BrandTbody"));
const LazyWrapper = lazy(() => import("../../components/common/LazyWrapper"));
const Pagination = lazy(() => import("../../components/Pagination"));

const BrandsView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const brands = useSelector((state: RootState) => state.brands.brands);
  const { query, debouncedFilter } = useBrandQuery();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    debouncedFilter({ page });
  };
  console.log(brands);

  return (
    <div className="grid grid-cols-12 gap-5 w-full h-full overflow-y-auto">
      <div className="flex flex-col w-full h-full gap-5 col-span-12">

        <LazyWrapper>
          <Nav
            value={query.search}
            onChange={(e) => debouncedFilter({ search: e.target.value })}
            dataBtn={brandListData.btnData}
            searchPlaceholder="Search Brand..."
          />
        </LazyWrapper>

        <LazyWrapper>
          <LayoutTable>
            <Thead columns={brandListData.brandColumns} />
            <BrandTbody data={brands.brands} />
          </LayoutTable>
        </LazyWrapper>

        <div className="flex justify-between mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase font-medium">
            Showing {brands.pageSize} of {brands.total} results
          </p>
          {
            brands.total > brands.pageSize && (
              <LazyWrapper>
                <Pagination
                  currentPage={currentPage}
                  totalPages={brands.total}
                  onPageChange={handlePageChange}
                />
              </LazyWrapper>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default BrandsView;
