import React from "react";

const Price = ({textSize,mrp,sellingPrice}) => {
  return (
    <div className="flex flex-row gap-x-3 font-[system-ui]">
      <p className={`${textSize} line-through text-gray-400`}>
        ₹ {Number(mrp)?.toLocaleString()}
      </p>
      <p className={`${textSize} font-semibold text-primary`}>
        ₹ {Number(sellingPrice)?.toLocaleString()}
      </p>
    </div>
  );
};

export default Price;
