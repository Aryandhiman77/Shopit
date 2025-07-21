import React from "react";
import { CiSearch } from "react-icons/ci";
import Button from '@mui/material/Button';


const Search = () => {
  return (
    <div className="flex rounded-xl bg-[#e5e5e5] relative w-[100%] justify-between">
      <input
        type="text"
        placeholder="Search any product"
        className="p-2 w-full focus:outline-none px-5"
      />
      <Button variant="text" className="px-2 py-2 rounded-r-xl text-white cursor-pointer">
        <CiSearch className="text-2xl"/>
      </Button>
    </div>
  );
};

export default Search;
