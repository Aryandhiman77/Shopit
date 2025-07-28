import Button from "@mui/material/Button";
import "./style.css";
import { Link } from "react-router-dom";

const RichBannerItem = ({ bg = "fff", item}) => {
  return (
    <div className={`w-fullrounded-xl shadow-2xl`} style={{ background: bg }}>
      <div className={`richbannercontainer relative`}>
        <img className="rounded-xl w-full h-full object-cover" src={item?.img} alt="" />
        <div
          className={`info absolute w-[50%] top-[0%] h-[100%] flex flex-col right-0 justify-center lg:gap-y-3 overflow-hidden`}
          style={{ color: item?.info.textColor }}
        >
          <h3 className="relative text-[10px] sm:text-[12px] md:text-sm lg:text-lg xl:text-xl font-[500] transition-all opacity-0 duration-700 -right-[80%]">
            {item?.info.subtitle}
          </h3>
          <h1 className="relative text-[12px] sm:text-sm md:text-lg lg:text-2xl xl:text-3xl font-[500] transition-all opacity-0 duration-1000 -right-[80%]">
            {item?.info.title}
          </h1>
          <p
            className="relative text-[10px] flex items-center transition-all opacity-0 -right-[80%]
          sm:text-[12px] md:text-sm lg:text-md xl:text-xl"
          >
            {item?.info?.priceLine}
            <span className="text-primary sm:text-sm md:text-xl lg:text-2xl xl:text-4xl font-bold px-1 xl:px-2">
              {item?.info.price}
            </span>
          </p>
          <div className="banner-link relative transition-all opacity-0 -bottom-[20%] w-full">
            <Link to={item?.info.btnlink}>
              <Button className="!bg-primary !text-white hover:bg-black">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RichBannerItem;
