import React, { useState } from "react";
import BrandContext from "./BrandContext";
import { Outlet } from "react-router-dom";
import { fetchData } from "../../utilities/RequestAPI";
import ConvertToFormData from "../../utilities/ConvertToFormData";
import toast from "react-hot-toast";
import CapitalizeFirstLetter from "../../utilities/CapitalizeFirstLetter";
import useLoading from "../../Components/hooks/useLoading";

const ADMIN_BRAND_API = "/admin/brands";

const BrandProvider = () => {
  const [loading, setLoading] = useState(false);
  const [brandListing, setBrandListing] = useState([]);
  const [brands, setBrands] = useState([]);
  const [formErrors, setFormErrors] = useState([]);
  const { isLoading, startLoading, stopLoading } = useLoading();

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

  const getBrands = async (query) => {
    setLoading(true);
    const response = await fetchData({
      url: `/admin/brands${query}`,
      method: "GET",
    });
    console.log(response);
    if (response?.success) {
      setBrands(response?.data);
    }
    setLoading(false);
  };

  const createBrand = async (details) => {
    setLoading(true);
    const formdata = ConvertToFormData(details);
    const response = await fetchData({
      url: `${ADMIN_BRAND_API}/create`,
      method: "POST",
      payload: formdata,
      isFormData: true,
    });
    console.log(response);
    if (response?.success) {
      setBrands(response?.data);
      setLoading(false);
      toast.success(`${CapitalizeFirstLetter(details.name)} brand created.`);
      return response.data;
    }
    if (response?.formErrors) {
      setLoading(false);
      setFormErrors(response.error);
    }
    if (response?.error) {
      setLoading(false);
    }
    setLoading(false);
  };

  const updateBrandLogo = async (id, image) => {
    const formdata = ConvertToFormData({ image });
    const response = await fetchData({
      url: `${ADMIN_BRAND_API}/${id}/logo`,
      method: "PATCH",
      payload: formdata,
      isFormData: true,
    });
    if (response?.success) {
      return response.data;
    }
    if (response?.error) {
      stopLoading(`update-${id}-brand`);
      return false;
    }
    return false;
  };

  const updateBrand = async (id, details) => {
    console.log(details);
    startLoading(`update-${id}-brand`);
    if (details.logo && details.logo instanceof File) {
      const imageUpdated = await updateBrandLogo(id, details.logo);
      if (!imageUpdated) {
        toast.error("Cannot update logo.");
        return;
      }
      delete details.logo;
    }
    const response = await fetchData({
      url: `${ADMIN_BRAND_API}/${id}/update`,
      method: "PATCH",
      payload: details,
    });
    if (response?.success) {
      setBrands((prev) => ({
        ...prev,
        brands: prev.brands?.map((b) =>
          b._id === id ? { ...b, ...response.data } : { ...b },
        ),
      }));
      toast.success("Brand updated.");
      stopLoading(`update-${id}-brand`);
      return response.data;
    }
    if (response?.error) {
      stopLoading(`update-${id}-brand`);
    }
    if (response?.formErrors) {
      setFormErrors(response?.formErrors);
      stopLoading(`update-${id}-brand`);
    }
    stopLoading(`update-${id}-brand`);
  };

  const resetFormErrors = () => {
    setFormErrors([]);
  };
  return (
    <BrandContext.Provider
      value={{
        getBrandsListing,
        loading,
        brandListing,
        getBrands,
        brands,
        formErrors,
        resetFormErrors,
        createBrand,
        updateBrand,
        isLoading,
      }}
    >
      <Outlet />
    </BrandContext.Provider>
  );
};

export default BrandProvider;
