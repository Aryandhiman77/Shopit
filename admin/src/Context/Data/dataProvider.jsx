import {useState } from 'react';
import DataContext from './DataContext';


export const DataProvider = ({ children }) => {
const [orders,setOrders] = useState([
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
          createdAt: "September 2,2025",
          modifiedAt: "September 2,2025",
        },
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
          createdAt: "September 2,2025",
          modifiedAt: "September 2,2025",
        },
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
          createdAt: "September 2,2025",
          modifiedAt: "September 2,2025",
        },
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
          createdAt: "September 2,2025",
          modifiedAt: "September 2,2025",
        },
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
          createdAt: "September 2,2025",
          modifiedAt: "September 2,2025",
        },
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
            {
              image:
                "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH?wid=750&hei=556&fmt=jpeg&qlt=90&.v=1724041668836",
              name: "Apple Airpods 2nd generation",
              quantity: 1,
              price: "₹ 23,999",
              status: "shipped",
            },
    
            {
              image:
                "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH?wid=750&hei=556&fmt=jpeg&qlt=90&.v=1724041668836",
              name: "Apple Airpods 2nd generation",
              quantity: 1,
              price: "₹ 23,999",
              status: "delivered",
            },
            {
              image:
                "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH?wid=750&hei=556&fmt=jpeg&qlt=90&.v=1724041668836",
              name: "Apple Airpods 2nd generation",
              quantity: 1,
              price: "₹ 23,999",
              status: "cancelled",
            },
            {
              image:
                "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH?wid=750&hei=556&fmt=jpeg&qlt=90&.v=1724041668836",
              name: "Apple Airpods 2nd generation",
              quantity: 1,
              price: "₹ 23,999",
              status: "refunded",
            },
          ],
          price: 2000,
          createdAt: "September 2,2025",
          modifiedAt: "September 2,2025",
        },
      ]);
const [products,setProducts] = useState([{
  "id": "prod_123",
  "name": "Men's Running Shoes",
  "description": "Lightweight running shoes for daily wear.",
  "categories": {
    "level1": { "id": "cat_fashion", "name": "Fashion" },
    "level2": { "id": "cat_men", "name": "Men" },
    "level3": { "id": "cat_shoes", "name": "Shoes" }
  },
  "brand": "Nike",
  "tags": ["running", "men", "sports","sneakers"],
  "thumbnail": "https://image.made-in-china.com/365f3j00YLVkbhSKhazC/Nike-Shoes-Branded-Men-Women-Sneakers-Air-Sport-Basketball-Running-Nike-Factory-in-China-Zapato-De-Marca-2024-New-Style-Nike-Sb-Dunk-Low.webp",
  "images": ["shoe-main.jpg", "shoe-side.jpg", "shoe-top.jpg"],
  "sales":"3",
  "createdAt":"August 1, 2024",
  "modifiedAt":"August 1, 2024",
  "status":"active",
  "variants": [
    {
      "id": "var_123_1",
      "sku": "SHOE-BLK-42",
      "attributes": {
        "color": "green",
        "size": "42",
      },
      "thumbnail": "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/75bc7c02-f18c-43d3-9456-2d00bb6d5e30/NIKE+JOURNEY+RUN.png",
      "price": 3999,
      "discountPrice": 3499,
      "stock": 25,
      "images": ["shoe-black-42.jpg", "shoe-black-side.jpg"],
      "rating":3.4,
      "status":"active"
    },
    {
      "id": "var_123_2",
      "sku": "SHOE-BLK-43",
      "attributes": {
        "color": "Black",
        "size": "43"
      },
      "price": 3999,
      "discountPrice": 3499,
      "stock": 15,
      "images": ["shoe-black-43.jpg"],
      "rating":3.4,
      "status":"inactive"
    }
  ]
}]
);
  return (
    <DataContext.Provider value={{ orders,products }}>
      {children}
    </DataContext.Provider>
  );
};