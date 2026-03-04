import React, { useState } from "react";
import ProductContext from "./ProductContext";
import { fetchData } from "../../utilities/RequestAPI";
import { Outlet } from "react-router-dom";
import toast from "react-hot-toast";
import ConvertToFormData from "../../utilities/ConvertToFormData";

const PRODUCT_API = "/management/product";

const ProductsProvider = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProductData] = useState({});
  const [formErrors, setFormErrors] = useState([]);

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
      toast.success(response?.data?.message);
      setProductData(response?.data);
      setLoading(false);
      return response.data;
    }
    if (response?.formErrors) {
      setFormErrors(response.formErrors);
      setLoading(false);
    }
    setLoading(false);
  };

  const uploadThumbnail = async (id, thumbnail) => {
    setLoading(true);
    const formdata = ConvertToFormData({ thumbnail });
    const response = await fetchData({
      url: `${PRODUCT_API}/${id}/thumbnail`,
      method: "PATCH",
      payload: formdata,
      isFormData: true,
    });
    console.log(response);
    if (response?.success) {
      toast.success(response?.data?.message);
      setProductData(response?.data);
      setLoading(false);
      console.log(response.data);
      return response.data;
    }
    if (response?.formErrors) {
      setFormErrors(response?.formErrors);
      setLoading(false);
    }
    setLoading(false);
  };
  const uploadGallery = async (id, gallery) => {
    const formdata = ConvertToFormData({ gallery });
    setLoading(true);
    const response = await fetchData({
      url: `${PRODUCT_API}/${id}/gallery`,
      method: "PATCH",
      payload: formdata,
      isFormData: true,
    });
    if (response?.success) {
      toast.success(response?.data?.message);
      setProductData(response?.data);
      setLoading(false);
      return response.data;
    }
    if (response?.formErrors) {
      setFormErrors(response.formErrors);
      setLoading(false);
    }
    setLoading(false);
  };
  const resetFormErrors = () => {
    setFormErrors([]);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        getProducts,
        createProduct,
        product,
        uploadThumbnail,
        uploadGallery,
        formErrors,
        resetFormErrors,
      }}
    >
      <Outlet />
    </ProductContext.Provider>
  );
};

export default ProductsProvider;
