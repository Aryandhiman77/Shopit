import { createContext, useState } from "react";
import DataContext from "./DataContext";
const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([
    {
      name: "Fashion",
      subcategories: [
        {
          name: "Menwear",
          items: ["Shirts", "T-Shirts", "Jeans", "Shoes", "Formals"],
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
    {
      img: "https://serviceapi.spicezgold.com/download/1742439896581_1737036773579_sample-1.jpg",
      info: {
        subtitle: "Best in Quality",
        title: "Stylish tops",
        priceLine: "Starting from",
        price: "₹499",
        btnlink:
          "https://serviceapi.spicezgold.com/download/1742439896581_1737036773579_sample-1.jpg",
        textColor: "black",
      },
    },
  ]);
  const [productsData,setProductsData]=useState([

    {
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVCZKw9sPNcO82b-gP8j-gXb8uOSr9EJ4hQg&s",
      productName:"iPhone 15 Pro Max",
      description:"lorem iphskdfkasl fjklasjf ksjafkl saflk; jsdajljf lskd jflksdj lf;j alj flja",
      mrpPrice:5000,
      sellingPrice:4000,
      rating:4.6,
      reviewsLength:770,
      discountPercentage:"20%",
      slug:"iphone-15-pro-max",gallery:[
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
  ]
    

    },
    {
      image:"https://www.imagineonline.store/cdn/shop/files/iPhone_15_Blue_PDP_Image_Position-1__en-IN.jpg?v=1755576990",
      productName:"iPhone 15 Pro Max",
      description:"lorem iphskdfkasl fjklasjf ksjafkl saflk; jsdajljf lskd jflksdj lf;j alj flja",
      mrpPrice:5000,
      sellingPrice:4000,
      rating:4.6,
      reviewsLength:770,
      discountPercentage:"20%",
      slug:"iphone-15-pro-max",
      gallery:[
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
  ]
    

    },
    {
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVCZKw9sPNcO82b-gP8j-gXb8uOSr9EJ4hQg&s",
      productName:"iPhone 15 Pro Max",
      description:"lorem iphskdfkasl fjklasjf ksjafkl saflk; jsdajljf lskd jflksdj lf;j alj flja",
      mrpPrice:5000,
      sellingPrice:4000,
      rating:4.6,
      reviewsLength:770,
      discountPercentage:"20%",
      slug:"iphone-15-pro-max",gallery:[
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
  ]
    

    },
    {
      image:"https://www.imagineonline.store/cdn/shop/files/iPhone_15_Blue_PDP_Image_Position-1__en-IN.jpg?v=1755576990",
      productName:"iPhone 15 Pro Max",
      description:"lorem iphskdfkasl fjklasjf ksjafkl saflk; jsdajljf lskd jflksdj lf;j alj flja",
      mrpPrice:5000,
      sellingPrice:4000,
      rating:4.6,
      reviewsLength:770,
      discountPercentage:"20%",
      slug:"iphone-15-pro-max",gallery:[
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
  ]
    

    },
    {
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVCZKw9sPNcO82b-gP8j-gXb8uOSr9EJ4hQg&s",
      productName:"iPhone 15 Pro Max",
      description:"lorem iphskdfkasl fjklasjf ksjafkl saflk; jsdajljf lskd jflksdj lf;j alj flja",
      mrpPrice:5000,
      sellingPrice:4000,
      rating:4.6,
      reviewsLength:770,
      discountPercentage:"20%",
      slug:"iphone-15-pro-max",gallery:[
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
  ]
    

    },
    {
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVCZKw9sPNcO82b-gP8j-gXb8uOSr9EJ4hQg&s",
      productName:"iPhone 15 Pro Max",
      description:"lorem iphskdfkasl fjklasjf ksjafkl saflk; jsdajljf lskd jflksdj lf;j alj flja",
      mrpPrice:5000,
      sellingPrice:4000,
      rating:4.6,
      reviewsLength:770,
      discountPercentage:"20%",
      slug:"iphone-15-pro-max",gallery:[
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
  ]
    

    },
    {
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVCZKw9sPNcO82b-gP8j-gXb8uOSr9EJ4hQg&s",
      productName:"iPhone 15 Pro Max",
      description:"lorem iphskdfkasl fjklasjf ksjafkl saflk; jsdajljf lskd jflksdj lf;j alj flja",
      mrpPrice:5000,
      sellingPrice:4000,
      rating:4.6,
      reviewsLength:770,
      discountPercentage:"20%",
      slug:"iphone-15-pro-max",gallery:[
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
  ]
    

    },
    {
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVCZKw9sPNcO82b-gP8j-gXb8uOSr9EJ4hQg&s",
      productName:"iPhone 15 Pro Max",
      description:"lorem iphskdfkasl fjklasjf ksjafkl saflk; jsdajljf lskd jflksdj lf;j alj flja",
      mrpPrice:5000,
      sellingPrice:4000,
      rating:4.6,
      reviewsLength:770,
      discountPercentage:"20%",
      slug:"iphone-15-pro-max",gallery:[
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
  ]
    

    },
    {
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVCZKw9sPNcO82b-gP8j-gXb8uOSr9EJ4hQg&s",
      productName:"iPhone 15 Pro Max",
      description:"lorem iphskdfkasl fjklasjf ksjafkl saflk; jsdajljf lskd jflksdj lf;j alj flja",
      mrpPrice:5000,
      sellingPrice:4000,
      rating:4.6,
      reviewsLength:770,
      discountPercentage:"20%",
      slug:"iphone-15-pro-max",gallery:[
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
  ]
    

    },
    {
      image:"https://www.jiomart.com/images/product/original/493839356/apple-iphone-15-pro-max-256-gb-white-titanium-digital-o493839356-p604578632-0-202309141823.jpeg?im=Resize=(420,420)",
      productName:"iPhone 15 Pro Max",
      description:"The iPhone 15 Pro Max features a strong, lightweight aerospace-grade titanium design, an advanced 6.7-inch Super Retina XDR display with ProMotion and Always-On capabilities, and the powerful A17 Pro chip for immersive gaming and all-day battery life. Its Pro camera system includes a 48MP Main camera, a 5x Telephoto camera, and an Ultra Wide camera for versatile, high-resolution photos. Key features also include a customizable Action Button, a USB-C port with USB 3 speeds, and safety features like Crash Detection and Emergency SOS via satellite.",
      mrpPrice:5000,
      sellingPrice:4000,
      rating:1.2,
      reviewsLength:770,
      discountPercentage:"20%",
      slug:"iphone-15-pro-max",gallery:[
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
    "https://iplanet.one/cdn/shop/files/iPhone_16_Pro_Desert_Titanium_PDP_Image_Position_1__en-IN_38a0c11d-1864-457e-a2e2-7333c0480a7b.jpg?v=1727249764",
  ]
    

    },
    
  ])
  return (
    <DataContext.Provider
      value={{ categories, adsBannerData, adsMiniBannersData,miniSliderBannerData,productsData }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
