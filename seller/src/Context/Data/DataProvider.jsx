import React, { useState } from "react";
import DataContext from "./DataContext";
import useAxios from "../../hooks/useAxios";

const DataProvider = ({ children }) => {
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
  const { response, loading, fetchData, error, responseProgress } = useAxios();
  return (
    <DataContext.Provider value={{ products, loading, responseProgress }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
