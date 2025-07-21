import React, { useState } from "react";
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

  const linkClasses = "w-full flex justify-between items-center px-3 py-2 hover:bg-[#e5e5e5]";

  const isActive = (name) => {
    // Example: you can adjust this to match your routes
    return location.pathname.toLowerCase().includes(name.toLowerCase());
  };

  return (
    <ul className="space-y-2">
      {items.map((category, index) => (
        <li key={index} className="space-y-1">
          <button
            type="button"
            className={`${linkClasses} ${isActive(category.name) ? "bg-[#e5e5e5]" : ""}`}
            onClick={() => toggleSubmenu(index)}
          >
            <div>{category.name}</div>
            {openSubmenus[index] ? <FaRegSquareMinus /> : <FaRegSquarePlus />}
          </button>

          {openSubmenus[index] && (
            <ul className="submenu font-[500]">
              {category.subcategories.map((sub, subIndex) => (
                <li key={subIndex} className="space-y-1">
                  <button
                    type="button"
                    className={`${linkClasses} pl-5 ${isActive(sub.name) ? "bg-[#e5e5e5]" : ""}`}
                    onClick={() => toggleInnerSubmenu(subIndex)}
                  >
                    <div>{sub.name}</div>
                    {openInnerSubmenus[subIndex] ? (
                      <FaRegSquareMinus />
                    ) : (
                      <FaRegSquarePlus />
                    )}
                  </button>

                  {openInnerSubmenus[subIndex] && (
                    <ul className="innersubmenu font-[400] space-y-1">
                      {sub.items.map((item, i) => (
                        <li key={i}>
                          <Link
                            to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                            className={`${linkClasses} pl-10 ${isActive(item) ? "bg-[#e5e5e5]" : ""}`}
                          >
                            <div>{item}</div>
                          </Link>
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
