import React, { useState } from 'react'
import ItemSlider from '../../../components/Reusables/Sliders/ItemSlider';

const Gallery = ({imagesData,defaultActive=0,getActive=()=>{}}) => {
    const [activeIndex,setActiveIndex]= useState(defaultActive);
    const handleActive =(i)=>{
        setActiveIndex(i);
        console.log(i);
    }
  return (
    <>
      <div className="gallery">
          <ItemSlider
          slidesOffsetBefore={40}
          slidesOffsetAfter={40}
            direction={"vertical"}
            slidesPerView={5}
            slidesPerGroup={1}
            spaceBetween={0}
            items={imagesData}
            breakpoints={false}
            renderItem={(src, i) => (
              <img
                key={i}
                className={`h-20 w-auto object-cover border-[1px] border-black rounded-xl cursor-pointer ${activeIndex===i?"opacity-100":"opacity-50"}`}
                src={src}
                onClick={()=>handleActive(i)}
                alt=""
              />
            )}
          />
        </div>
    </>
  )
}

export default Gallery
