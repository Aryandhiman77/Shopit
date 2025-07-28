import Button from '@mui/material/Button'
import React from 'react'
import { Link } from 'react-router-dom'

const StaticBannerItem = ({bg,item,horizontalTextAlign="right",verticalTextAlign="center"}) => {
  return (
    <div className={`w-full rounded-xl shadow-2xl group`} style={{ background: bg }}>
      <div className={`richbannercontainer relative block overflow-hidden rounded-xl
        `}>
        <img className="rounded-xl w-full group-hover:scale-105 object-contain transition-all duration-500" src={item?.img} alt="" />
        <div
          className={`info absolute w-[55%] top-[0%] h-[100%] flex flex-col ${horizontalTextAlign==="left"?"left-3":"right-0"} min-[200px]:gap-y-3 md:gap-y-2 overflow-hidden`}
          style={{ color: item?.info.textColor,justifyContent:verticalTextAlign==="center"?"center":verticalTextAlign==="end"?"end":"start" }}
        >
          <h1 className="relative text-[12px] sm:text-sm md:text-md xl:text-lg font-[500]">
            {item?.info.title}
          </h1>
          <p
            className="relative text-[10px] flex items-center 
          sm:text-[12px] lg:text-[11px] xl:text-[14px] font-bold" 
          >
            {item?.info?.priceLine}
            <span className="text-primary sm:text-sm md:text-md lg:text-md xl:text-xl font-bold px-1 xl:px-1">
              {item?.info.price}
            </span>
          </p>
          <div className="banner-link relative transition-all w-full">
            <Link to={item?.info.btnlink}>
              <Button className="!bg-primary !text-white hover:bg-black">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StaticBannerItem
