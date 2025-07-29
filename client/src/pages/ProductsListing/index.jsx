import React from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/Reusables/BreadCrumb";
import { IoHomeOutline } from "react-icons/io5";


const ProductsListing = () => {
  const { category } = useParams();

  const breadcrumbItems = [
    {
      label: "Home",
      href: "/",
      icon: <IoHomeOutline />,
      onClick: (e) => {
        e.preventDefault();
        console.log("Home clicked");
      },
    },
    {
      label: category.replaceAll("-"," "),
      onClick: (e) => {
        e.preventDefault();
        console.log("Catalog clicked");
      },
      onDelete: (e) => {
        e.preventDefault();
        console.log("Delete icon clicked");
      },
    }
  ];
  
  return (
    <div>
        <div className="breadcrump p-5">
      <BreadCrumb items={breadcrumbItems}/>
      </div>
    </div>
  );
};

export default ProductsListing;
