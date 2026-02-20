import React, { useState } from "react";
import ProductContext from "./ProductContext";
import { fetchData } from "../../utilities/RequestAPI";

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const getProducts = async (limit, page) => {
    const queryString = limit && page ? `limit=${limit}&page=${page}` : "";
    const response = await fetchData({
      url: `/admin/products?${queryString}`,
      method: "GET",
    });
    if (response?.success) {
      setProducts(response.data);
    }
  };
  return (
    <ProductContext.Provider value={{ products, loading, getProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductsProvider;
