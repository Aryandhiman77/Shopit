import React from "react";
import ProductSkeleton from "../../components/Reusables/Items/ProductItem/ProductSkeleton";

const ProductSkeletonPage = ({
  horizontal = false,
  viewStyle = "grid",
  count = 10,
}) => {
  return (
    <div
      className={`product-list mt-2 ${
        viewStyle === "grid"
          ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          : ""
      }`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={`product-skeleton-${i}`}
          className={`product-item mt-4 ${
            horizontal ? "list-view" : "grid-view"
          }`}
        >
          <ProductSkeleton />
        </div>
      ))}
    </div>
  );
};

export default React.memo(ProductSkeletonPage);
