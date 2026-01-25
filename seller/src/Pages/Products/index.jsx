import React, { useEffect } from "react";
import Box from "../../components/Reusables/Elements/Box";
import ProductList from "../Dashboard/ProductList";
import useData from "../../hooks/useData";

const Products = () => {
  const { fetchSellerProducts } = useData();
  useEffect(() => {
    fetchSellerProducts();
  }, []);
  return (
    <div>
      <ProductList />
    </div>
  );
};

export default Products;
