import React from "react";
import { data } from "react-router-dom";
import StaticBannerItem from "../../../components/Reusables/Items/StaticBannerItem";

const StaticBannerSection = ({ items }) => {
    console.log(items)
  return (
    <section className="static-banner-section">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 md:p-10 md:px-12">
        {items?.map((item) => (
            
          <StaticBannerItem item={item} horizontalTextAlign={item?.info.horizontalTextAlignment} verticalTextAlign={item?.info.verticalTextAlignment} />
        ))}
      </div>
    </section>
  );
};

export default StaticBannerSection;
