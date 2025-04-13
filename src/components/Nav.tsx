/** @format */

import Btn from "./Btn";
import { FC, ReactNode } from "react";
import SearchField from "./fields/SearchField";

interface NavProps {
  searchPlaceholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dataBtn: {
    text: string;
    className: string;
    path?: string;
    icon?: ReactNode;
    onClick?: () => void;
  }[];
}

const Nav: FC<NavProps> = ({ dataBtn, searchPlaceholder, onChange, value }) => {
  return (
    <div className='flex items-center flex-wrap  justify-between gap-4'>
      {/* search */}

      <SearchField placeholder={searchPlaceholder} onChange={onChange} value={value}  />
      {/* buttons */}
      {dataBtn.map((item, index) => (
        <Btn
          key={index}
          path={item.path}
          className={item.className}
          text={item.text}
          icon={item.icon}
          onClick={item.onClick}
        />
      ))}
      
    </div>
  );
};

export default Nav;
