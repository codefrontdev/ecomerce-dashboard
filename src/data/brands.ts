/** @format */

import {
  ArrowDownToLine,
  EllipsisVertical,
  LayoutGrid,
  List,
} from "lucide-react";
import React from "react";

export const brandListData = {
  btnData: [
    {
      text: "Bulk Actions",
      className:
        "bg-gray-50 border text-teal-700 flex items-center gap-2 border-gray-300 font-medium text-sm px-4 py-2.5 rounded-md",
      icon: React.createElement(EllipsisVertical, { size: 16 }),
    },
    {
      text: "Export brands",
      className:
        "bg-gray-50 text-teal-700 flex items-center gap-2 border border-gray-300 font-medium text-sm px-4 py-2.5 rounded-md",
      icon: React.createElement(ArrowDownToLine, { size: 16 }),
    },
    {
      path: "/brands/create-brand",
      text: "Create Brand",
      className:
        "bg-orange-400 text-white font-medium text-sm px-6 py-2.5 rounded-md",
    },
  ],
  dataFilters: [
    {
      id: 1,
      name: "All Brands",
      items: 100, // عدّل الرقم حسب البيانات الحقيقية
    },
    {
      id: 2,
      name: "With Logo",
      items: 80, // عدّل الرقم حسب البيانات الحقيقية
    },
    {
      id: 3,
      name: "Without Logo",
      items: 20, // عدّل الرقم حسب البيانات الحقيقية
    },
  ],
  btnDataHeader: [
    {
      path: "/brands-grid",
      icon: React.createElement(LayoutGrid, { size: 20 }),
    },
    {
      path: "/brands-list",
      icon: React.createElement(List, { size: 20 }),
    },
  ],
  brandColumns: [
    "Checkbox",
      "Brand Name",
    "Logo",
    "Created At",
    "Updated At",
        "",
  ],
};

