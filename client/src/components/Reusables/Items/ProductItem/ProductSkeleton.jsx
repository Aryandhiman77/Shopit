import React from "react";
import SkeletonImage, { SkeletonText } from "../../Elements/Loader/skeleton";
import GetRating from "./rating";

const ProductSkeleton = ({ horizontal }) => {
  return (
    <>
      <div className="overflow-hidden block rounded-t-lg ">
        <div className="block aspect-square">
          <SkeletonImage />
        </div>
      </div>
      <div
        className={`details p-2 w-full flex flex-col ${
          horizontal ? "gap-2" : "gap-1"
        }`}
      >
        <SkeletonText width="40%" />
        <SkeletonText width="70%" />
        <SkeletonText width="20%" />
        <SkeletonText width="80%" />
        <SkeletonText
          width={`${horizontal ? "20%" : "100%"}`}
          className="h-10!"
        />
      </div>
    </>
  );
};

export default ProductSkeleton;
