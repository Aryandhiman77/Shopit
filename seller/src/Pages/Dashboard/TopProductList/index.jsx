import React from "react";
import TopProductItem from "./TopProductItem";
// import "./style.css";
const TopProductList = () => {
  return (
    <div className="custom-scrollbar!">
      <TopProductItem />
      <TopProductItem />
      <TopProductItem />
      <TopProductItem />
      <TopProductItem />
      <TopProductItem />
    </div>
  );
};

export default TopProductList;
