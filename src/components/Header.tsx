/** @format */

import { FC, ReactNode } from "react";
import Btn from "./Btn";

export interface DataBtn {
  text?: string;
  path?: string;
  icon?: ReactNode;
}

interface DataFilter {
  id: number;
  name: string;
  items: number;
}

interface HeaderProps {
  dataBtn: DataBtn[];
  dataFilters: DataFilter[];
  currentView?: "grid" | "list";
  onViewChange?: (view: "grid" | "list") => void;
}

const Header: FC<HeaderProps> = ({ dataBtn, dataFilters, currentView, onViewChange }) => {
  const handleViewChange = () => {
    if (onViewChange) {
      const newView = currentView === "grid" ? "list" : "grid";
      onViewChange(newView);
    }
  };

  return (
    <div className="flex items-center flex-wrap justify-between py-4">
      {/* Filter by status */}
      <div className="flex gap-4">
        {dataFilters.map((item) => (
          <div key={item.id} className="flex items-center gap-4 uppercase">
            <span className="text-gray-600 font-medium text-sm">{item.name}</span>
            <span className="text-gray-600 font-medium text-sm px-2 py-1 border border-gray-300 bg-gray-50 rounded-md">
              ({item.items})
            </span>
          </div>
        ))}
      </div>

      {/* Grid or List View */}
      <div className="flex gap-2">
        {dataBtn.map((item, index) => (
          <Btn
            key={index}
            text={item.text}
            className={`p-1 border flex items-center gap-2 border-gray-300 bg-gray-50 rounded-md cursor-pointer 
              ${item.text?.toLowerCase() === currentView ? "text-teal-700" : "text-gray-500"}`}
            icon={item.icon}
            onClick={handleViewChange}
          />
        ))}
      </div>
    </div>
  );
};

export default Header;
