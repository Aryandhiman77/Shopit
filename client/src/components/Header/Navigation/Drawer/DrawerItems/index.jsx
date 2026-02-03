import React, { useEffect, useState } from "react";
import { FaRegSquareMinus, FaRegSquarePlus } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

const DrawerItems = ({ items }) => {
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [openInnerSubmenus, setOpenInnerSubmenus] = useState({});
  const location = useLocation();

  const toggleSubmenu = (index) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleInnerSubmenu = (subIndex) => {
    setOpenInnerSubmenus((prev) => ({
      ...prev,
      [subIndex]: !prev[subIndex],
    }));
  };

  const linkClasses =
    "w-full flex justify-between items-center px-3 py-2 hover:bg-[#e5e5e5]";

  const isActive = (name) => {
    // Example: you can adjust this to match your routes
    return location.pathname.toLowerCase().includes(name.toLowerCase());
  };
  useEffect(()=>{
    console.log("drawre")
  },[])

  return (
    <ul className="space-y-2">
      {items.map((category, index) => (
        <li key={index} className="space-y-1">
          <button
            className={`${linkClasses} ${isActive(category.name) ? "bg-[#e5e5e5]" : ""}`}
            onClick={() => toggleSubmenu(index)}
          >
            <Link
              to={`/category/${category.slug}`}
              className="hover:text-primary capitalize"
            >
              {category.name}
            </Link>
            {openSubmenus[index]
              ? category.subcategories.length > 0 && (
                  <FaRegSquareMinus color="white" className="bg-black" />
                )
              : category.subcategories.length > 0 && <FaRegSquarePlus />}
          </button>

          {openSubmenus[index] && (
            <ul className="submenu font-[500]">
              {category.subcategories.map((sub, subIndex) => (
                <li key={subIndex} className="space-y-1">
                  <button
                    className={`${linkClasses} pl-5 ${isActive(sub.name) ? "bg-[#e5e5e5]" : ""}`}
                    onClick={() => toggleInnerSubmenu(subIndex)}
                  >
                    <Link
                      to={`/category/${sub.slug}`}
                      className="hover:text-primary capitalize"
                    >
                      {sub.name}
                    </Link>
                    {/* {openInnerSubmenus[subIndex] ? (
                      <FaRegSquareMinus />
                    ) : (
                      <FaRegSquarePlus />
                    )} */}
                    {openInnerSubmenus[subIndex]
                      ? sub.subcategories.length > 0 && (
                          <FaRegSquareMinus
                            color="white"
                            className="bg-black"
                          />
                        )
                      : sub.subcategories.length > 0 && <FaRegSquarePlus />}
                  </button>

                  {openInnerSubmenus[subIndex] && (
                    <ul className="innersubmenu font-[400] space-y-1">
                      {sub.subcategories?.map((item, i) => (
                        <li key={i}>
                          <div
                            to={`/category/${item.slug}`}
                            className={`${linkClasses} pl-10 ${isActive(item.name) ? "bg-[#e5e5e5]" : ""}`}
                          >
                            <Link
                              to={`/category/${category.slug}`}
                              className="hover:text-primary capitalize"
                            >
                              {item.name}
                            </Link>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default DrawerItems;
