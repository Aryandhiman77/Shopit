import React, { useState } from "react";
import ProductContext from "./ProductContext";
import { fetchData } from "../../utilities/RequestAPI";
import { Outlet } from "react-router-dom";

const ProductsProvider = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async ({ limit, page, status = "all" }) => {
    setLoading(true);
    const queryString =
      limit && page ? `limit=${limit}&page=${page}&status=${status}` : "";
    const response = await fetchData({
      url: `/admin/products?${queryString}`,
      method: "GET",
    });
    if (response?.success) {
      setProducts(response.data);
    }
    setLoading(false);
  };
  return (
    <ProductContext.Provider value={{ products, loading, getProducts }}>
      <Outlet />
    </ProductContext.Provider>
  );
};

export default ProductsProvider;
