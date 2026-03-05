import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import CustomButton from "../../../../Components/Reusables/Elements/CustomBtn";
import useProducts from "../../../../Components/hooks/useProducts";
import { MdError, MdErrorOutline, MdUnpublished } from "react-icons/md";

const ProductAdded = ({ setCurrentProgress, resetForm }) => {
  const { loading, updateProductStatus } = useProducts();
  let productId = localStorage.getItem("draftProductId");
  const [updatedProduct, setUpdatedProduct] = useState({});
  const makeProductLive = async () => {
    const updated = await updateProductStatus(productId, { status: "active" });
    if (updated) {
      setUpdatedProduct(updated);
      setCurrentProgress(100);
      productId = updated._id;
    }
  };
  if (!productId) {
    return (
      <div className="flex justify-center items-center flex-col gap-3 bg-red-200 py-8 rounded-2xl border border-red-500">
        <MdError className="text-red-600" size={40} />
        Cannot find product information. Please see your product in product
        list.
        <Link
          to="/products"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white!"
        >
          Product List
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center bg-white p-10 rounded-xl shadow-md gap-6">
      {updatedProduct?.status ? (
        <FaCheckCircle style={{ fontSize: 80 }} className="text-green-500" />
      ) : (
        <>
          <h1 className="text-2xl font-semibold text-gray-800">
            Product Ready to Publish
          </h1>
          <MdUnpublished style={{ fontSize: 80 }} className="text-red-500" />
        </>
      )}

      {!updatedProduct?.status && (
        <p className="text-gray-500 text-center">
          Your product has been created as a draft. You can now make it live so
          customers can see it in the store.
        </p>
      )}

      {updatedProduct?.status && (
        <p className="text-gray-500 text-center max-w-md">
          Your product{" "}
          <span className="font-medium">{updatedProduct?.title}</span> has been
          published and is now available in your store.
        </p>
      )}

      {/* {product?.thumbnail?.url && (
        <img
          src={updatedProduct.thumbnail.url}
          alt="product"
          className="w-40 h-40 object-cover rounded-lg border"
        />
      )} */}

      {!updatedProduct.status && (
        <>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg">
            Preview Product
          </button>
          <CustomButton
            title={"Publish Product"}
            disabled={loading}
            loading={loading}
            onClick={makeProductLive}
            className={"bg-[#796de7] rounded-md!"}
            fontWeight={500}
            textPadding={1}
          />
        </>
      )}

      {updatedProduct?.status && (
        <div className="flex gap-4 mt-4">
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg">
            Preview Product
          </button>

          {/* <Link
            to={`/products`}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Edit Product
          </Link> */}

          <Link
            to="/products"
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            Product List
          </Link>

          <button
            onClick={resetForm}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg"
          >
            Add Another
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductAdded;
