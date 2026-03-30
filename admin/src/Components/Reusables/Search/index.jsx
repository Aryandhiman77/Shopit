import { TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { PiCommandBold } from "react-icons/pi";

const Search = ({
  endIcon,
  placeholder,
  onSearch = (value) => {},
  className,
}) => {
  const debounceRef = useRef(null);

  const handleChange = (e) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      onSearch(e.target.value);
    }, 600);
  };
  useEffect(() => {
    return () => clearTimeout(debounceRef?.current);
  }, []);
  return (
    <>
      <div
        className={`flex flex-row items-center custom-border rounded-lg p-2  w-full ${className} `}
      >
        <IoSearchOutline />
        <input
          name="search"
          onChange={handleChange}
          type="text"
          className="focus:outline-none px-2 text-sm w-full "
          placeholder={placeholder}
        />
        {endIcon}
      </div>
    </>
  );
};

export default Search;
