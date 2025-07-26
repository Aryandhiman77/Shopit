
import { createContext, useState } from 'react';
export const DataContext = createContext();
const DataProvider = ({ children }) => {
  const [categories,setCategories] =useState([
    {
      name: "Fashion",
      subcategories: [
        {
          name: "Menwear",
          items: ["Shirts", "T-Shirts", "Jeans", "Shoes","Formals"],
        },
        {
          name: "Womenwear",
          items: ["Dresses", "Tops", "Skirts", "Heels"],
        },
        {
          name: "Accessories",
          items: ["Bags", "Belts", "Watches"],
        },
      ],
    },
    {
      name: "Electronics",
      subcategories: [
        {
          name: "Mobiles",
          items: ["iPhone", "Samsung Galaxy", "OnePlus"],
        },
        {
          name: "Laptops",
          items: ["MacBook", "Dell XPS", "HP Spectre"],
        },
        {
          name: "Headphones",
          items: ["AirPods", "Sony WH-1000XM5", "Bose QC45"],
        },
      ],
    },
    {
      name: "Home & Kitchen",
      subcategories: [
        {
          name: "Furniture",
          items: ["Sofas", "Beds", "Dining Tables"],
        },
        {
          name: "Appliances",
          items: ["Refrigerators", "Microwaves", "Mixers"],
        },
        {
          name: "Decor",
          items: ["Lamps", "Wall Art", "Clocks"],
        },
      ],
    },
    {
      name: "Sports",
      subcategories: [
        {
          name: "Outdoor",
          items: ["Tents", "Sleeping Bags", "Hiking Boots"],
        },
        {
          name: "Fitness",
          items: ["Yoga Mats", "Dumbbells", "Resistance Bands"],
        },
      ],
    },
  ]);
  const [adsBannerData,setAdsBannerData] = useState([
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
  ])
  const [adsMiniBannersData,setAdsMiniBannerData]= useState([
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
  ])
  return (
    <DataContext.Provider value={{categories,adsBannerData,adsMiniBannersData}}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
