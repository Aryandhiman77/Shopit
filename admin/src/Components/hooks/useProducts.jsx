import React, { useContext } from "react";
import ProductContext from "../../Context/Products/ProductContext";

const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be inside ProductsProvider");
  }
  return context;
};

export default useProducts;
