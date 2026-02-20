import { Divider } from "@mui/material";
import React from "react";

const TopProductItem = ({ title, sales, available = true, stockRemaining }) => {
  return (
    <div className="w-full">
      <div className="item py-4 flex gap-3">
        <img
          src="https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg"
          className="rounded-xl"
          height={80}
          width={80}
        />
        <div className="flex flex-col justify-between py-1 w-full">
          <div className="flex items-center justify-between ">
            <p className="text-sm font-semibold line-clamp-1">
              Red tape shoes with bluggy sdfajlkdfjsdfsa
            </p>
            <div className="text-[12px] font-medium flex gap-2 items-center">
              <div
                className="font-extrabold text-xl"
                style={{ color: `${available ? "#00a63e" : "red"}` }}
              >
                &middot;
              </div>
              {available ? (
                <span className="text-green-600">Available</span>
              ) : (
                <span className="text-red-600">Unavailable</span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between ">
            <p className="text-[12px] text-gray-400 font-medium">
              12,444 Sales
            </p>
            <p className="text-[12px] text-gray-400 font-medium">
              700 Remaining Stock
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopProductItem;
