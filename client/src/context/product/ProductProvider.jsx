import React, { useState } from "react";
import ProductContext from "./ProductContext";
import { fetchData } from "../../utility/RequestAPI";
import useLoading from "../../hooks/useLoading";

const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState({});
  const { startLoading, stopLoading, isLoading } = useLoading();
  const getProduct = async (slug = "") => {
    startLoading("product-detail");
    const response = await fetchData({
      url: `/product/${slug}`,
      method: "GET",
    });
    if (response.success) {
      setProduct(response.data);
      stopLoading("product-detail");
    }
    if (response.errors) {
      stopLoading("product-detail");
    }
    stopLoading("product-detail");
  };
  const resetProduct = () => {
    setProduct({});
  };
  return (
    <ProductContext.Provider value={{ getProduct, product, isLoading,resetProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
