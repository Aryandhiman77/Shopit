import React, { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { PiCommandBold } from "react-icons/pi";

const Search = ({ endIcon, placeholder, onSearch = () => {} }) => {
  const [search, setSearch] = useState("");
  const debounceRef = useRef(null);

  const handleChange = (e) => {
    setSearch(e.target.value);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      onSearch(val);
    }, 500);
  };

  useEffect(() => {
    return () => clearTimeout(debounceRef?.current);
  }, []);
  return (
    <>
      <div className="flex flex-row items-center custom-border rounded-lg p-2 bg-white shadow-sm">
        <IoSearchOutline />
        <input
          name="search"
          onChange={handleChange}
          type="text"
          value={search}
          className="focus:outline-none px-2 text-sm"
          placeholder={placeholder}
        />
        {endIcon}
      </div>
    </>
  );
};

export default Search;
