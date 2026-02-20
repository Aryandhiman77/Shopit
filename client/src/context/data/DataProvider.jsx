import { createContext, useState } from "react";
import DataContext from "./DataContext";
import { fetchData } from "../../utility/RequestAPI";
const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // for listing
  const [productDetails, setDetails] = useState({}); // for showing the product detail page..
  const [categories, setCategories] = useState([]); // all categories
  const [brandsByCategory, setBrandsByCategory] = useState([]);
  const [level1Categories, setLevel1Categories] = useState([]);
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

  const [adsBannerData, setAdsBannerData] = useState([
    {
      img: "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60",
      link: "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60",
    },
    {
      img: "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60",
      link: "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60",
    },
    {
      img: "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60",
      link: "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60",
    },
    {
      img: "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60",
      link: "https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/1206619937a5421c.jpeg?q=60",
    },
  ]);
  const [adsMiniBannersData, setAdsMiniBannerData] = useState([
    {
      img: "https://www.jiomart.com/images/cms/aw_rbslider/slides/1753477176_2.jpg?im=Resize=(768,448)",
      link: "https://www.jiomart.com/images/cms/aw_rbslider/slides/1753477176_2.jpg?im=Resize=(768,448)",
    },
    {
      img: "https://www.jiomart.com/images/cms/aw_rbslider/slides/1753376828_2.jpg?im=Resize=(768,448)",
      link: "https://www.jiomart.com/images/cms/aw_rbslider/slides/1753376828_2.jpg?im=Resize=(768,448)",
    },
    {
      img: "https://www.jiomart.com/images/cms/aw_rbslider/slides/1753477176_2.jpg?im=Resize=(768,448)",
      link: "https://www.jiomart.com/images/cms/aw_rbslider/slides/1753477176_2.jpg?im=Resize=(768,448)",
    },
    {
      img: "https://www.jiomart.com/images/cms/aw_rbslider/slides/1753477176_2.jpg?im=Resize=(768,448)",
      link: "https://www.jiomart.com/images/cms/aw_rbslider/slides/1753477176_2.jpg?im=Resize=(768,448)",
    },
    {
      img: "https://www.jiomart.com/images/cms/aw_rbslider/slides/1753376828_2.jpg?im=Resize=(768,448)",
      link: "https://www.jiomart.com/images/cms/aw_rbslider/slides/1753376828_2.jpg?im=Resize=(768,448)",
    },
    {
      img: "https://www.jiomart.com/images/cms/aw_rbslider/slides/1753376828_2.jpg?im=Resize=(768,448)",
      link: "https://www.jiomart.com/images/cms/aw_rbslider/slides/1753376828_2.jpg?im=Resize=(768,448)",
    },
  ]);
  const [miniSliderBannerData, setMiniSliderBannerData] = useState([
    {
      img: "https://serviceapi.spicezgold.com/download/1742441193376_1737037654953_New_Project_45.jpg",
      info: {
        subtitle: "Slimest, Fastest, Powerful",
        title: "Apple iPhone 15 Pro 128GB, titanium",
        priceLine: "Starting from",
        price: "₹59,999",
        btnlink:
          "https://serviceapi.spicezgold.com/download/1742439896581_1737036773579_sample-1.jpg",
        textColor: "black",
      },
    },
    {
      img: "https://png.pngtree.com/thumb_back/fh260/background/20210413/pngtree-eid-blue-color-background-1920900-px-image_615127.jpg",
      info: {
        subtitle: "Slimest, Fastest, Powerful",
        title: "Apple iPhone 15 Pro 128GB, titanium",
        priceLine: "Starting from",
        price: "₹59,999",
        btnlink:
          "https://serviceapi.spicezgold.com/download/1742439896581_1737036773579_sample-1.jpg",
        textColor: "white",
      },
    },
  ]);
  const getOrderedCategories = async () => {
    startLoading("orderedCategories");
    const result = await fetchData({
      url: `/categories`,
      method: "GET",
    });
    if (result?.success) {
      console.log(result.data);
      setCategories(result.data);
    }
    if (result?.error) {
      setErrors({ ...errors, categories: result.error });
    }
    stopLoading("orderedCategories");
  };

  const getCategoryProducts = async (category) => {
    startLoading("categoryProducts");
    const result = await fetchData({
      url: `/products/${category}`,
      method: "GET",
    });
    if (result?.success) {
      setProducts(result.data);
    }
    stopLoading("categoryProducts");
  };
  const getBrandsByCategory = async (category) => {
    startLoading("categoryBrands");
    const result = await fetchData({
      url: `/brands/${category}`,
      method: "GET",
    });
    if (result?.success) {
      setBrandsByCategory(result.data);
    }
    stopLoading("categoryBrands");
  };

  const getFeaturedProducts = async () => {};

  const cartItems = [
    { brand: "Apple", name: "iPhone 15 Pro", price: "₹ 15,000" },
    { brand: "Apple", name: "iPhone 15 Pro", price: "₹ 15,000" },
    { brand: "Apple", name: "iPhone 15 Pro", price: "₹ 15,000" },
    { brand: "Apple", name: "iPhone 15 Pro", price: "₹ 15,000" },
  ];

  const addresses = [
    {
      fullName: "Aryan dhiman",
      type: "home",
      fullAddress: "Vpo sarsehri, ambala cantt, haryana - 133001",
    },
    {
      fullName: "Aryan dhiman",
      type: "home",
      fullAddress: "Vpo sarsehri, ambala cantt, haryana - 133001",
    },
  ];

  return (
    <DataContext.Provider
      value={{
        categories,
        adsBannerData,
        adsMiniBannersData,
        miniSliderBannerData,
        products,
        level1Categories,
        cartItems,
        addresses,
        getCategoryProducts,
        loading,
        getOrderedCategories,
        brandsByCategory,
        getBrandsByCategory,
        isLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
