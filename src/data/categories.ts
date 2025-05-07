/** @format */

import {
  ArrowDownToLine,
  EllipsisVertical,
  LayoutGrid,
  List,
} from "lucide-react";
import React from "react";

export const categoryListData = {
  btnData: [
    {
      text: "Bulk Actions",
      className:
        "bg-gray-50 border text-teal-700 flex items-center gap-2 border-gray-300 font-medium text-sm px-4 py-2.5 rounded-md",
      icon: React.createElement(EllipsisVertical, { size: 16 }),
    },
    {
      text: "Export categories",
      className:
        "bg-gray-50 text-teal-700 flex items-center gap-2 border border-gray-300 font-medium text-sm px-4 py-2.5 rounded-md",
      icon: React.createElement(ArrowDownToLine, { size: 16 }),
    },
    {
      path: "/categories/create-category",
      text: "Create Category",
      className:
        "bg-orange-400 text-white font-medium text-sm px-6 py-2.5 rounded-md",
    },
  ],
  dataFilters: [
    {
      id: 1,
      name: "All Categories",
      items: 100, // Replace with the actual total number of categories
    },
    {
      id: 2,
      name: "Active",
      items: 80, // Replace with the number of active categories
    },
    {
      id: 3,
      name: "Inactive",
      items: 20, // Replace with the number of inactive categories
    },
  ],
  btnDataHeader: [
    {
      path: "/categories-grid",
      icon: React.createElement(LayoutGrid, { size: 20 }),
    },
    {
      path: "/categories-list",
      icon: React.createElement(List, { size: 20 }),
    },
  ],
  categoryColumns: [
    "Checkbox",
    "Category Name",
    "Description",
    "Status",
    "Tags",
    "Created At",
    "Updated At",
    "",
  ],
};
