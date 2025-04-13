/** @format */

import { FC } from "react";
import { Link } from "react-router-dom";

interface BtnProps {
  text?: string;
  className?: string;
  path?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

const Btn: FC<BtnProps> = ({ text, className = "", path, onClick, icon, type="button", disabled }) => {
  const content = (
    <>
      {icon}
      {text}
    </>
  );

  return path ? (
    <Link to={path} className={`cursor-pointer ${className}`}>
      {content}
    </Link>
  ) : (
    <button onClick={onClick} disabled={disabled} type={type} className={`cursor-pointer ${className}`}>
      {content}
    </button>
  );
};

export default Btn;
