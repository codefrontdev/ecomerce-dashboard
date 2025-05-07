/** @format */

// components/Pagination.tsx
import React from "react";
import Btn from "./Btn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <Btn
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-4 py-1 bg-gray-300 rounded-md text-sm font-medium"
        text="Prev"
      />
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`px-4 py-1 mx-1 rounded-md text-sm font-medium ${
            currentPage === index + 1
              ? "bg-orange-400 text-white"
              : "bg-gray-300"
          }`}
        >
          {index + 1}
        </button>
      ))}
      <Btn
        onClick={handleNext}
        text="Next"
        disabled={currentPage === totalPages}
        className="px-4 py-1 bg-gray-300 rounded-md text-sm font-medium"
      />
    </div>
  );
};

export default Pagination;
