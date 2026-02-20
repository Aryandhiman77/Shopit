import React, { useState } from "react";
import DataContext from "./DataContext";
import toast from "react-hot-toast";
import { fetchData } from "../../utilities/RequestAPI";

const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState({});

  const startLoading = (key) =>
    setLoading((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));

  const stopLoading = (key) =>
    setLoading((prev) => ({
      ...prev,
      [key]: Math.max((prev[key] || 1) - 1, 0),
    }));

  const isLoading = (key) => {
    return (loading[key] || 0) > 0;
  };
  const fetchLevel1Cats = async () => {
    const result = await fetchData({
      url: "/seller/cats",
      method: "GET",
    });
    if (response?.success) {
      setProducts(response.data);
    }
  };
  const fetchSellerProducts = async () => {
    // const result = await fetchData({
    //   url: "/seller/products",
    //   method: "GET",
    // });
    // if (response?.success) {
    //   setProducts(response.data);
    // }
  };
  return (
    <DataContext.Provider value={{ products, isLoading, fetchSellerProducts }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
