import React, { useContext } from "react";
import ProductContext from "../context/product/ProductContext";

const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used inside ProductProvider");
  }
  return context;
};

export default useProduct;
