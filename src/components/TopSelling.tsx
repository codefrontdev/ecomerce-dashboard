/** @format */

import { useState } from "react";
import Table from "./table/Table";
import SelectOptions from "./SelectOptions";

type ProductStatus = "In Stock" | "Low Stock";
export interface ProductType {
  id: number;

  "Product Name": string;

  price: string;
  status: ProductStatus;
  sold: number;
  "total earning": string;
  image: string;
}

export const productColumns = [
  "Product Name",
  "price",
  "status",
  "sold",
  "total earning",
];

export const productData: ProductType[] = [
  {
    id: 1,
    "Product Name": "Apple MacBook Pro 16",
    price: "$2399",
    status: "In Stock",
    sold: 150,
    "total earning": "$359,850",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    "Product Name": "Samsung Galaxy S21",
    price: "$799",
    status: "In Stock",
    sold: 200,
    "total earning": "$159,800",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    "Product Name": "Sony WH-1000XM4 Headphones",
    price: "$350",
    status: "In Stock",
    sold: 300,
    "total earning": "$105,000",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    "Product Name": "Dell XPS 13",
    price: "$999",
    status: "In Stock",
    sold: 180,
    "total earning": "$179,820",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    "Product Name": "Apple AirPods Pro",
    price: "$249",
    status: "In Stock",
    sold: 450,
    "total earning": "$112,050",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    "Product Name": "Microsoft Surface Laptop 4",
    price: "$1299",
    status: "In Stock",
    sold: 100,
    "total earning": "$129,900",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 7,
    "Product Name": "Fitbit Charge 5",
    price: "$149",
    status: "In Stock",
    sold: 500,
    "total earning": "$74,500",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 8,
    "Product Name": "GoPro HERO10 Black",
    price: "$499",
    status: "In Stock",
    sold: 120,
    "total earning": "$59,880",
    image: "https://avatars.githubusercontent.com/u/47231161?v=4",
  },
];

const TopSelling = () => {
  const [sortBy, setSortBy] = useState<string>("sort by");
  const [sortedData, setSortedData] = useState<ProductType[]>(productData);

  // التعامل مع الفرز
  const handleSort = (sortOption: string) => {
    setSortBy(sortOption);

    let sortedProducts = [...productData]; 
    if (sortOption === "Price") {
      sortedProducts = sortedProducts.sort(
        (a, b) =>
          parseFloat(a.price.replace("$", "").replace(",", "")) -
          parseFloat(b.price.replace("$", "").replace(",", ""))
      );
    } else if (sortOption === "Sold") {
      sortedProducts = sortedProducts.sort((a, b) => a.sold - b.sold);
    } else if (sortOption === "Total Earning") {
      sortedProducts = sortedProducts.sort(
        (a, b) =>
          parseFloat(a["total earning"].replace("$", "").replace(",", "")) -
          parseFloat(b["total earning"].replace("$", "").replace(",", ""))
      );
    }
    setSortedData(sortedProducts);
  };

  return (
    <div className='w-3/4 bg-white dark:bg-gray-700 p-4 rounded-lg'>
      <SelectOptions
        handleRange={(e) => handleSort(e.target.value)}
        options={["sort by", "Price", "Sold", "Total Earning"]}
        range={sortBy}
        title='Top Selling'
      />
      <Table type='product id' columns={productColumns} data={sortedData} />
    </div>
  );
};

export default TopSelling;
