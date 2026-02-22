import React, { useState } from "react";
import BrandContext from "./BrandContext";
import { Outlet } from "react-router-dom";
import { fetchData } from "../../utilities/RequestAPI";

const BrandProvider = () => {
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const getBrandsListing = async () => {
    setLoading(true);
    const response = await fetchData({
      url: "/common/brands",
    });
    if (response?.success) {
      setBrands(response?.data);
      console.log(response.data);
    }
    setLoading(false);
  };
  return (
    <BrandContext.Provider value={{ getBrandsListing, loading, brands }}>
      <Outlet />
    </BrandContext.Provider>
  );
};

export default BrandProvider;
