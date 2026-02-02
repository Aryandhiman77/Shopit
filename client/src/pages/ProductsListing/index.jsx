import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/Reusables/BreadCrumb";
import { IoGridSharp } from "react-icons/io5";
import Sidebar from "../../components/SideBar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ProductItem from "../../components/Reusables/Items/ProductItem";
import { GiHamburgerMenu } from "react-icons/gi";
import Pagination from "@mui/material/Pagination";
import useData from "../../hooks/useData";
import noProductsImage from "../../assets/noProductFound.png";
import "./style.css";
import ProductSkeleton from "../../components/Reusables/Items/ProductItem/ProductSkeleton";
import ProductSkeletonPage from "./ProductSkeletonPage";

const ProductsListing = () => {
  const { category } = useParams();
  const { products, getCategoryProducts, loading } = useData();

  const [viewStyle, setViewStyle] = useState("grid");
  const [anchorEl, setAnchorEl] = useState(null);
  const [productsLimit, setProductsLimit] = useState(10);
  // const [animate,setAnimate] = useState(false)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!category) {
      return;
    }
    getCategoryProducts(category, { limit: productsLimit });
  }, [category]);
  return (
    <div className="max-w-full">
      <BreadCrumb staticValues={"category"} />
      <div className="wrapper flex flex-row gap-5 w-[100%] mt-5  p-5">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-full ">
          <div className="w-full col-2 bg-[#e5e5e5] rounded-2xl">
            <div className="header-container flex justify-between p-2">
              <div className="flex items-center">
                <Button
                  onClick={() => setViewStyle("list")}
                  className={`!text-gray-700 ${
                    viewStyle === "list" && "!text-primary"
                  } `}
                >
                  <GiHamburgerMenu className="text-xl" />
                </Button>
                <Button
                  onClick={() => setViewStyle("grid")}
                  className={`!text-gray-700 ${
                    viewStyle === "grid" && "!text-primary"
                  }`}
                >
                  <IoGridSharp className="text-xl" />
                </Button>
                <p>There are {products.length} products.</p>
              </div>
              <div className="flex items-center gap-2 ">
                <p>Sort by</p>
                <div>
                  <Button
                    id="basic-button"
                    className="!bg-white !text-primary"
                    aria-controls={open ? "grouped-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    Sales, hightest to lowest
                  </Button>
                  <Menu
                    id="grouped-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                      list: {
                        "aria-labelledby": "basic-button",
                        sx: {
                          py: 0,
                        },
                      },
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      Sales, hightest to lowest
                    </MenuItem>
                    <MenuItem onClick={handleClose}>Name,A to Z</MenuItem>
                    <MenuItem onClick={handleClose}>Name, Z to A</MenuItem>
                    <MenuItem onClick={handleClose}>
                      Price, low to high
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      Price, high to low
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
          <div className="products w-full">
            {loading.products ? (
              <ProductSkeletonPage
                viewStyle={viewStyle}
                horizontal={viewStyle === "list"}
                count={viewStyle === "grid" ? 20 : 30}
              />
            ) : !loading?.products && products.length === 0 ? (
              <div className="flex justify-center items-center">
                <div className="p-35">
                  <img
                    src={noProductsImage}
                    className="h-50"
                    alt="No products available in this category"
                  />
                </div>
              </div>
            ) : (
              !loading?.products &&
              products?.length > 0 && (
                <div
                  className={`product-list mt-2 ${
                    viewStyle === "grid"
                      ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                      : ""
                  }`}
                >
                  {products.map((item) => (
                    <div key={item.slug} className="z-20 relative p-2 fade-in">
                      <ProductItem
                        item={item}
                        horizontal={viewStyle === "list"}
                      />
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
          <div className="pagination flex justify-center mt-5">
            {productsLimit > 0 && products?.length > 0 && (
              <Pagination
                count={productsLimit / products?.length}
                variant="outlined"
                shape="rounded"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsListing;
