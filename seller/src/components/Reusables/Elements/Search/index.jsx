import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { PiCommandBold } from "react-icons/pi";

const Search = ({ endIcon, placeholder }) => {
  return (
    <div className="flex flex-row items-center custom-border rounded-lg p-2 bg-white shadow-sm hover:scale-105 transition-all duration-200">
      <IoSearchOutline />
      <input
        type="text"
        className="focus:outline-none px-2 text-sm "
        placeholder={placeholder}
      />
      {endIcon}
    </div>
  );
};

export default Search;
