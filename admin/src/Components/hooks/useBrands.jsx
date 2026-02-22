import React, { useContext } from "react";
import BrandContext from "../../Context/Brand/BrandContext";

const useBrands = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error("useBrands be used inside BrandProvider");
  }
  return context;
};

export default useBrands;
