/** @format */

import React, { useCallback, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbReport, TbShoppingBag } from "react-icons/tb";
import { BadgePercent, LogOut, Logs } from "lucide-react";
import { MdDashboard, MdOutlineReviews } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { LiaUsersSolid } from "react-icons/lia";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const dataMenu = [
  {
    id: 1,
    name: "Dashboard",
    icon: <LuLayoutDashboard size={20} />,
    activeIcon: <MdDashboard size={20} />,
    path: "/",
  },
  {
    id: 2,
    name: "Products",
    path: "/products",
    icon: <TbShoppingBag size={20} />,
    items: [
      { id: 1, name: "Product Page", path: "/products/1" },
      { id: 2, name: "Create Product", path: "/products/create" },
    ],
  },
  {
    id: 3,
    name: "Orders",
    path: "/orders",
    icon: <Logs size={20} />,
    items: [
      { id: 1, name: "Order Detail", path: "/orders/1" },
      { id: 2, name: "Invoice", path: "/orders/invoice" },
    ],
  },
  {
    id: 4,
    name: "Customers",
    path: "/customers",
    icon: <LiaUsersSolid size={20} />,
    items: [{ id: 1, name: "Customer Detail", path: "/customers/1" }],
  },
  { id: 5, name: "Sales", path: "/sales", icon: <BadgePercent size={20} /> },
  {
    id: 6,
    name: "Reviews",
    path: "/reviews",
    icon: <MdOutlineReviews size={20} />,
  },
  { id: 7, name: "Reports", path: "/reports", icon: <TbReport size={20} /> },
];

const otherMenu = [
  {
    id: 1,
    name: "Settings",
    path: "/settings",
    icon: <CiSettings size={20} />,
  },
  { id: 2, name: "Logout", path: "/logout", icon: <LogOut size={20} /> },
];

const Item = ({
  item,
  activeItem,
  setActiveItem,
  activeSubItem,
  setActiveSubItem,
}: {
  item: any;
  activeItem: number | null;
  setActiveItem: React.Dispatch<React.SetStateAction<number | null>>;
  activeSubItem: string | null;
  setActiveSubItem: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const location = useLocation();
  const isActive = activeItem === item.id || location.pathname === item.path;

  const handleClick = useCallback(() => {
    setActiveItem((prev) => (prev === item.id ? null : item.id));
    setActiveSubItem(null);
  }, [item.id, setActiveItem, setActiveSubItem]);

  return (
    <li className='mb-2'>
      <Link
        className={`relative flex items-center justify-between px-4 py-1 rounded-lg transition duration-300 ${
          isActive ? "text-white" : "text-gray-300 hover:text-white"
        }`}
        to={item.path}
        onClick={handleClick}>
        <span className='flex items-center gap-2'>
          {isActive && item.activeIcon ? item.activeIcon : item.icon}
          {item.name}
          {isActive && (
            <div className='absolute top-0 left-0 w-[4px] h-full bg-[#ff8548] -translate-x-8'></div>
          )}
        </span>
        {item.items?.length && (
          <span className='absolute right-0 transform translate-x-4 transition-transform duration-300 ease-in-out'>
            {isActive ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </span>
        )}
      </Link>
      {isActive && item.items && (
        <ul className='ml-5 mt-1 space-y-2'>
          {item.items.map(
            (subItem: { id: number; name: string; path: string }) => (
              <li
                key={subItem.id}
                className={`p-2 ${
                  subItem.path === activeSubItem
                    ? "text-white"
                    : "text-[#c7dad6]"
                }`}
                onClick={() => setActiveSubItem(subItem.path)}>
                <Link
                  className='font-normal no-underline hover:text-white'
                  to={subItem.path}>
                  {subItem.name}
                </Link>
              </li>
            )
          )}
        </ul>
      )}
    </li>
  );
};

const Menu = ({ data }: { data: any[] }) => {
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [activeSubItem, setActiveSubItem] = useState<string | null>(null);

  return (
    <ul className='space-y-2'>
      {data.map((item) => (
        <Item
          key={item.id}
          item={item}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          activeSubItem={activeSubItem}
          setActiveSubItem={setActiveSubItem}
        />
      ))}
    </ul>
  );
};

const SideBar = () => {
  return (
    <div className='sticky top-8 w-[250px] flex-none max-w-[250px] max-h-fit min-h-[calc(100vh-40px)] rounded-[30px] bg-teal-700 px-8 py-4'>
      <div className='text-2xl font-bold mb-2 text-white'>Ecommerce</div>
      <h2 className='text-base font-light mb-3 uppercase text-gray-300'>
        Menu
      </h2>
      <Menu data={dataMenu} />
      <div className='w-full h-px bg-gray-300 my-6' />
      <h2 className='text-base font-light uppercase text-gray-300 mb-3'>
        Other
      </h2>
      <Menu data={otherMenu} />
    </div>
  );
};

export default SideBar;
