/** @format */

import {
  ArrowDownToLine,
  EllipsisVertical,
  LayoutGrid,
  List,
} from "lucide-react";
import React from "react";

export const productsListData = {
  btnData: [
    {
      text: "Bulk Actions",
      className:
        "bg-gray-50 border text-teal-700 flex items-center gap-2 border-gray-300 font-medium text-sm px-4 py-2.5 rounded-md",
      icon: React.createElement(EllipsisVertical, { size: 16 }),
    },
    {
      text: "Export products",
      className:
        "bg-gray-50 text-teal-700 flex items-center gap-2 border border-gray-300 font-medium text-sm px-4 py-2.5 rounded-md",
      icon: React.createElement(ArrowDownToLine, { size: 16 }),
    },
    {
      path: "/products/create-product",
      text: "Create Product",
      className:
        "bg-orange-400 text-white font-medium text-sm px-6 py-2.5 rounded-md",
    },
  ],
  dataFilters: [
    {
      id: 1,
      name: "all products",
      items: 334,
    },
    {
      id: 2,
      name: "available",
      items: 54,
    },
    {
      id: 3,
      name: "Disabled",
      items: 43,
    },
  ],
  btnDataHeader: [
    {
      path: "/products-grid",
      icon: React.createElement(LayoutGrid, { size: 20 }),
    },
    {
      path: "/products-list",
      icon: React.createElement(List, { size: 20 }),
    },
  ],
  productColumns: [
    "Checkbox",
    "Product Name",
    "Price",
    "Stock",
    "Discount",
    "Status",
    "Attributes",
    "Colors / Sizes",
    "Publish Date",
    "Updated At",
    "",
  ],
};
