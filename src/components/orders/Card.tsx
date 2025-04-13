/** @format */

import React, { FC } from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-700 gap-5 p-4 rounded-lg ${className}`}>
      {children}
    </div>
  );
};

export default Card;
