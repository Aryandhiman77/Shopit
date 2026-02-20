import Divider from "@mui/material/Divider";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import "./style.css";
import { Collapse } from "react-collapse";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Rating from "@mui/material/Rating";
import useData from "../../hooks/useData";
import { SkeletonText } from "../Reusables/Elements/Loader/skeleton";

const Sidebar = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [rating, setRating] = useState(-1);
  const [dropdowns, setDropdowns] = useState({
    brand: true,
    categories: false,
    price: false,
    rating: true,
  });
  const [values, setValues] = useState([20, 4000]);
  const { getBrandsByCategory, brandsByCategory, isLoading } = useData();
  const toggleDropdown = (key) => {
    setDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const handleInput = (val) => {
    setValues(val);
  };
  const toggleQueryArray = (params, key, slug) => {
    // first create the array
    // check if the slug already exists in array if so then return the prev arr
  };

  const handleBrandFilter = (slug) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      const brands = params.getAll("brands");

      if (brands.includes(slug)) {
        // remove
        const filtered = brands.filter((b) => b !== slug);
        params.delete("brands");
        filtered.forEach((b) => params.append("brands", b));
      } else {
        // add
        params.append("brands", slug);
      }

      return params;
    });
  };

  const handleRefreshForQueryString = () => {
    let allBrandsInParams = searchParams.getAll("brand");
    console.log(allBrandsInParams);
  };

  useEffect(() => {
    if (category) {
      getBrandsByCategory(category);
    }
    handleRefreshForQueryString();
  }, []);

  return (
    <div className="w-full bg-[#e9e9e9] rounded-xl">
      <div className="border-b-2 border-gray-200">
        <div className="heading text-md p-2 font-[500] bg-white rounded-t-xl">
          Filter
        </div>
      </div>
      <div className="wrapper flex flex-col p-1 gap-1 min-h-[20vh]">
        {/* Brand Section */}
        <div className="brand bg-white rounded-xl">
          <div
            className="flex justify-between items-center p-2 cursor-pointer"
            onClick={() => toggleDropdown("brand")}
          >
            <p className="text-sm font-[500]">Brand</p>
            {dropdowns.brand ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </div>
          <Collapse isOpened={dropdowns.brand}>
            <div className="flex flex-row bg-[#f0f0f0e8] items-center p-2 mx-2 rounded-lg gap-2">
              <IoSearchOutline />
              <input
                type="text"
                className="focus:outline-none text-[13px] w-full"
                placeholder="Search Brand ..."
              />
            </div>
            <div className="p-1 scrolling">
              {isLoading("categoryBrands") ? (
                <div className="space-y-4">
                  <SkeletonText className="h-8!" />
                  <SkeletonText className="h-8!" />
                  <SkeletonText className="h-8!" />
                  <SkeletonText className="h-8!" />
                  <SkeletonText className="h-8!" />
                </div>
              ) : (
                brandsByCategory?.map((brand, idx) => (
                  <label
                    key={idx}
                    className="flex justify-between hover:bg-[#e5e5e5] p-1 rounded-xl cursor-pointer"
                    htmlFor={`checkbox-brand-${idx}`}
                  >
                    <div className="flex flex-row items-center">
                      <img
                        src={brand.logo.url}
                        className="w-10 h-auto object-cover "
                        alt={brand.name}
                        loading="eager"
                      />
                      <div className="p-2 text-sm font-[500] capitalize">
                        {brand.name}
                      </div>
                    </div>
                    <input
                      onChange={() => handleBrandFilter(brand?.slug)}
                      type="checkbox"
                      id={`checkbox-brand-${idx}`}
                      className="accent-primary"
                    />
                  </label>
                ))
              )}
            </div>
          </Collapse>
        </div>

        {/* Categories Section */}
        <div className="categories bg-white rounded-xl">
          <div
            className="flex justify-between items-center p-2 cursor-pointer"
            onClick={() => toggleDropdown("categories")}
          >
            <p className="text-sm font-[500]">Categories</p>
            {dropdowns.categories ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </div>
          <Collapse isOpened={dropdowns.categories}>
            <ul className="p-1 scrolling">
              {[
                "Electronics",
                "Fashion",
                "Home & furniture",
                "Clothes",
                "Sports",
              ].map((cat, idx) => (
                <li key={idx} className="flex justify-between">
                  <Link className="p-1" to={"/"}>
                    {cat}
                  </Link>
                  <input type="checkbox" className="accent-primary" />
                </li>
              ))}
            </ul>
          </Collapse>
        </div>

        {/* Price Section */}
        <div className="categories bg-white rounded-xl">
          <div
            className="flex justify-between items-center p-2 cursor-pointer"
            onClick={() => toggleDropdown("price")}
          >
            <p className="text-sm font-[500]">Price</p>
            {dropdowns.price ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </div>
          <Collapse isOpened={dropdowns.price}>
            <div className="p-3">
              <RangeSlider
                onInput={(val) => handleInput(val)}
                min={0}
                max={9999}
                step={30}
                defaultValue={[100, 6000]}
                value={values}
              />
            </div>
            <div className="text-sm font-[600] flex flex-row justify-between p-2">
              <label htmlFor="minPrice ">
                From: ₹
                <input
                  id="minPrice"
                  type="number"
                  value={values[0]}
                  className="w-20 h-auto focus:outline-none border-[1px] border-gray-300 font-[400] rounded-sm ml-1"
                  onChange={(e) =>
                    setValues((prev) => [Number(e.target.value), prev[1]])
                  }
                />
              </label>
              <label htmlFor="maxPrice">
                To: ₹
                <input
                  id="maxPrice"
                  type="number"
                  value={values[1]}
                  className="w-20 h-auto focus:outline-none border-[1px] border-gray-300 font-[400] rounded-sm ml-1"
                  onChange={(e) =>
                    setValues((prev) => [prev[0], Number(e.target.value)])
                  }
                />
              </label>
            </div>
          </Collapse>
        </div>
        {/* Size Section */}
        <div className="ratings bg-white rounded-xl">
          <div
            className="flex justify-between items-center p-2 cursor-pointer"
            onClick={() => toggleDropdown("rating")}
          >
            <p className="text-sm font-[500]">Rating</p>
            {dropdowns.price ? <IoIosArrowDown /> : <IoIosArrowForward />}
          </div>
          <Collapse isOpened={dropdowns.rating}>
            <div className="p-3 flex flex-col">
              <Rating
                value={rating}
                precision={0.1}
                className="!text-primary"
                onChange={(e, val) => setRating(val)}
              />
              <div>
                <p>{rating}/5</p>
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
