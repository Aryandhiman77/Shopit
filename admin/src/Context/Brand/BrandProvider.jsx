import React, { useState } from "react";
import BrandContext from "./BrandContext";
import { Outlet } from "react-router-dom";
import { fetchData } from "../../utilities/RequestAPI";

const BrandProvider = () => {
  const [loading, setLoading] = useState(false);
  const [brandListing, setBrandListing] = useState([]);
  const [brands, setBrands] = useState([]);

  const getBrandsListing = async () => {
    setLoading(true);
    const response = await fetchData({
      url: "/management/brands/listing",
    });
    if (response?.success) {
      setBrandListing(response?.data);
    }
    setLoading(false);
  };

  const getBrands = async ({ limit, page, status = "all" }) => {
    console.log("request");
    setLoading(true);
    const response = await fetchData({
      url: "/admin/brands",
      method: "GET",
    });
    console.log(response);
    if (response?.success) {
      setBrands(response?.data);
    }
    setLoading(false);
  };

  return (
    <BrandContext.Provider
      value={{ getBrandsListing, loading, brandListing, getBrands, brands }}
    >
      <Outlet />
    </BrandContext.Provider>
  );
};

export default BrandProvider;
