import React, { useState } from "react";
import ProductContext from "./ProductContext";
import { fetchData } from "../../utilities/RequestAPI";
import { Outlet } from "react-router-dom";

const PRODUCT_API = "/management/product";

const ProductsProvider = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProductData] = useState({});

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

  const createProduct = async (details) => {
    console.log(details);
    setLoading(true);
    const response = await fetchData({
      url: `${PRODUCT_API}/create`,
      method: "POST",
      payload: details,
    });
    if (response?.success) {
      toast.success(response.data.message);
      setLoading(false);
      setProductData(response?.data);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <ProductContext.Provider
      value={{ products, loading, getProducts, createProduct, product }}
    >
      <Outlet />
    </ProductContext.Provider>
  );
};

export default ProductsProvider;
