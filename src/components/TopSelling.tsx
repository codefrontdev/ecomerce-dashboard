import { useSelector } from "react-redux";
import SelectOptions from "./SelectOptions";
import Table from "./table/Table";
import { RootState } from "../redux/store";
import { useTopSellingQuery } from "../hooks/useTopSelling";

export const productColumns = [
  "Product Name",
  "price",
  "status",
  "sold",
  "total earning",
];


const TopSelling = () => {
  const { sortBy, setSortBy } = useTopSellingQuery();

  const topSelling = useSelector(
    (state: RootState) => state.analytics.topSelling.data
  );


  const handleSort = (value: string) => {
    if (value === "Price") setSortBy("price");
    else if (value === "Sold") setSortBy("Sold");
    else if (value === "Total Earning") setSortBy("totalEarning");
  };

  return (
    <div className="w-3/4 bg-white dark:bg-gray-700 p-4 rounded-lg">
      <SelectOptions
        handleRange={(e) => handleSort(e.target.value)}
        options={["sort by", "Price", "Sold", "Total Earning"]}
        range={sortBy}
        title="Top Selling"
      />
      <Table columns={productColumns} data={topSelling} />
    </div>
  );
};

export default TopSelling;
