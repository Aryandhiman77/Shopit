// src/Context/Data/DataContext.js
import { createContext, useContext, useState } from "react";

import { DataContext } from "./DataContext";
import { fetchData } from "../../utilities/RequestAPI";
import ConvertToFormData from "../../utilities/ConvertToFormData";
import toast from "react-hot-toast";
import CustomToast from "../../Components/Reusables/CustomToast";

// ✅ Provider Component
export const DataProvider = ({ children }) => {
  const [orders, setOrders] = useState([
    {
      orderId: "#32422432",
      paymentId: 32422432,
      username: "Aryan Dhiman",
      phoneNumber: "+91 123456789",
      items: [
        {
          image:
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH?wid=750&hei=556&fmt=jpeg&qlt=90&.v=1724041668836",
          name: "Apple Airpods 2nd generation",
          quantity: 1,
          price: "₹ 23,999",
          status: "pending",
        },
      ],
      price: 2000,
      createdAt: "2025-09-08T11:24:00.000Z",
      modifiedAt: "2025-09-08T11:24:00.000Z",
    },
  ]);

  const [products, setProducts] = useState([
    {
      id: "prod_123",
      name: "Men's Running Shoes",
      description: "Lightweight running shoes for daily wear.",
      categories: {
        level1: { id: "cat_fashion", name: "Fashion" },
        level2: { id: "cat_men", name: "Men" },
        level3: { id: "cat_shoes", name: "Shoes" },
      },
      brand: "Nike",
      tags: ["running", "men", "sports", "sneakers"],
      thumbnail:
        "https://image.made-in-china.com/365f3j00YLVkbhSKhazC/Nike-Shoes-Branded-Men-Women-Sneakers-Air-Sport-Basketball-Running-Nike-Factory-in-China-Zapato-De-Marca-2024-New-Style-Nike-Sb-Dunk-Low.webp",
      sales: "3",
      createdAt: "August 1, 2024",
      modifiedAt: "August 1, 2024",
      status: "active",
      variants: [
        {
          id: "var_123_1",
          sku: "SHOE-BLK-42",
          attributes: { color: "green", size: "42" },
          thumbnail:
            "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/75bc7c02-f18c-43d3-9456-2d00bb6d5e30/NIKE+JOURNEY+RUN.png",
          price: 3999,
          discountPrice: 3499,
          stock: 25,
          rating: 3.4,
          status: "active",
        },
      ],
    },
  ]);

  const [lineChartData, setLineChartData] = useState([
    { name: "JAN", Total_Users: 4000, Total_Sales: 2400, amt: 2400 },
    { name: "FEB", Total_Users: 3000, Total_Sales: 1398, amt: 2210 },
    { name: "MARCH", Total_Users: 2000, Total_Sales: 9800, amt: 2290 },
    { name: "APRIL", Total_Users: 2780, Total_Sales: 3908, amt: 2000 },
    { name: "MAY", Total_Users: 1890, Total_Sales: 4800, amt: 2181 },
    { name: "JUNE", Total_Users: 2390, Total_Sales: 3800, amt: 2500 },
    { name: "JULY", Total_Users: 3490, Total_Sales: 4300, amt: 2100 },
    { name: "AUGUST", Total_Users: 3490, Total_Sales: 4300, amt: 2100 },
  ]);

  const [level1Categories, setLevel1Categories] = useState([]);
  const [level2Categories, setLevel2Categories] = useState([]);
  const [level3Categories, setLevel3Categories] = useState([]);
  const [orderedCategories, setOrderedCategories] = useState([]);
  const [addedCategory, setAddedCategory] = useState({});
  const [formErrors, setFormErrors] = useState(null);
  const [errors, setErrors] = useState({ categories: null, products: null });
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

  const handleFullScreenConfirmation = ({ fn, message }) => {
    toast.custom(
      (obj) => <CustomToast callFn={fn} toastId={obj.id} message={message} />,
      {
        duration: Infinity,
      },
    );
  };

  const getAllOrderedCategories = async () => {
    startLoading(`ordered-categories`);
    const response = await fetchData({
      url: `/common/categories`,
      method: "GET",
    });
    if (response?.success) {
      setOrderedCategories(response.data);
      stopLoading(`ordered-categories`);
      return true;
    }
    if (response?.error) {
      setErrors(response.error);
      stopLoading(`ordered-categories`);
    }
  };

  const getCategoriesByLevel = async (level) => {
    if (!level || level > 3) return;
    startLoading(`level${level}categories`);
    const response = await fetchData({
      url: `/common/categories/${level}`,
      method: "GET",
    });
    if (response?.success) {
      if (level === 1) {
        setLevel1Categories(response.data);
      } else if (level === 2) {
        setLevel2Categories(response.data);
      } else {
        setLevel3Categories(response.data);
      }
      stopLoading(`level${level}categories`);
    }
    if (response?.error) {
      setErrors(response.error);
      stopLoading(`level${level}categories`);
    }
  };
  const addCategory = async (details) => {
    startLoading("add-category");
    const formdata = ConvertToFormData(details);
    const response = await fetchData({
      url: `/admin/categories/create`,
      method: "POST",
      payload: formdata,
      isFormData: true,
    });
    if (response?.success) {
      // setAddedCategory(response?.data);
      toast.success("Category added.");
      stopLoading("add-category");
      return true; // for reseting the form
    }
    if (response?.error) {
      setErrors({ ...errors, categoriesByLevel: result.error });
      stopLoading("add-category");
    }
    if (response?.formErrors) {
      setFormErrors(response?.formErrors);
      stopLoading("add-category");
    }
  };

  const replaceCategoryById = (tree, updated) => {
    return tree?.map((cat) => {
      if (updated._id === cat._id) {
        return updated;
      }
      if (cat.childCategories?.length) {
        return {
          ...cat,
          childCategories: replaceCategoryById(cat.childCategories, updated),
        };
      }
      return cat;
    });
  };

  const updateCategory = async (details) => {
    const id = details.id;
    delete details.id;
    startLoading(`update-${id}-category`);
    const response = await fetchData({
      url: `/admin/categories/update-cat-status/${id}`,
      method: "PATCH",
      payload: details,
    });
    if (response?.success) {
      setOrderedCategories((prev) => {
        const replacedData = replaceCategoryById(prev, response?.data);
        return replacedData;
      });
      toast.success(response?.message);
      stopLoading(`update-${id}-category`);
      return true;
    }
    if (response?.error) {
      setErrors({ ...errors, categoriesErrors: response.error });
      stopLoading(`update-${id}-category`);
    }
    if (response?.formErrors) {
      setFormErrors(response?.formErrors);
      stopLoading(`update-${id}-category`);
    }
  };
  return (
    <DataContext.Provider
      value={{
        orders,
        products,
        lineChartData,
        addCategory,
        isLoading,
        level1Categories,
        level2Categories,
        level3Categories,
        getCategoriesByLevel,
        getAllOrderedCategories,
        orderedCategories,
        updateCategory,
        handleFullScreenConfirmation,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// ✅ Hook
export default DataProvider;
