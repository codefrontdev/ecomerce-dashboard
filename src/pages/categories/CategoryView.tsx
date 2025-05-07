/** @format */
import { lazy } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { categoryListData } from "../../data/categories";
import { useCategoryQuery } from "../../hooks/useCategoryQuery";

const Nav = lazy(() => import("../../components/Nav"));
const LayoutTable = lazy(() => import("../../components/table/LayoutTable"));
const Thead = lazy(() => import("../../components/table/Thead"));
const CategoryTbody = lazy(() => import("../../components/table/CategoryTbody"));
const LazyWrapper = lazy(() => import("../../components/common/LazyWrapper"));
const Pagination = lazy(() => import("../../components/Pagination"));

const CategoriesView = () => {
  const categories = useSelector((state: RootState) => state.categories.categories);
  const { query, setQuery, debouncedFilter } = useCategoryQuery();

  const handlePageChange = (page: number) => {
    setQuery({ ...query, page });
    debouncedFilter({ page });
  };

  return (
    <div className='grid grid-cols-12 gap-5 w-full h-full overflow-y-auto'>
      <div className='flex flex-col w-full h-full gap-5 col-span-12'>

        <LazyWrapper>
          <Nav
            value={query.search}
            onChange={(e) => debouncedFilter({ search: e.target.value })}
            dataBtn={categoryListData.btnData}
            searchPlaceholder='Search Category...'
          />
        </LazyWrapper>


        <LazyWrapper>
          <LayoutTable>
            <Thead columns={categoryListData.categoryColumns} />
            <CategoryTbody data={categories.categories} />
          </LayoutTable>
        </LazyWrapper>

        <div className='flex justify-between mt-4'>
          <p className='text-sm text-gray-500 dark:text-gray-400 uppercase font-medium'>
            Showing {categories.pageSize} of {categories.total} results
          </p>
          {
            categories.total > categories.pageSize && (
              <LazyWrapper>
                <Pagination
                  currentPage={categories.page}
                  totalPages={categories.total}
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

export default CategoriesView;
