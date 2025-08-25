import React, { useRef } from "react";
import "./style.css";

const ImageZoom = ({ image, children }) => {
  const lens = useRef(null);
  const mainImage = useRef(null);
  const magnifiedImage = useRef(null);

  const moveLens = (e) => {
    let x, y, cx, cy;
    let product_image_rect = mainImage.current.getBoundingClientRect();
    x = e.clientX - product_image_rect.left - lens.current.offsetWidth / 2;
    y = e.clientY - product_image_rect.top - lens.current.offsetHeight / 2;

    let max_xpos = product_image_rect.width - lens.current.offsetWidth;
    let max_ypos = product_image_rect.height - lens.current.offsetHeight;
    if (x > max_xpos) x = max_xpos;
    if (x < 0) x = 0;
    if (y > max_ypos) y = max_ypos;
    if (y < 0) y = 0;
    lens.current.style = `top:${y}px; left:${x}px;`;

    cx = magnifiedImage.current.offsetWidth / lens.current.offsetWidth;
    cy = magnifiedImage.current.offsetHeight / lens.current.offsetHeight;
    magnifiedImage.current.style = `background:url(${image}) 
      -${x * cx}px -${y * cy}px /
      ${product_image_rect.width * cx}px ${product_image_rect.height * cy}px no-repeat`;
      magnifiedImage.current.classList.remove("hidden") 
  };

  const onMouseLeavesImage = () => {
    magnifiedImage.current.style = "opacity:0";
    magnifiedImage.current.classList.add("hidden") 
    lens.current.style = "opacity:0";
  };

  return (
    <div className="w-full">
      <div className="images-container flex flex-col md:flex-row gap-5 p-2">
        {/* Left image */}
        <div
          className="image-1 relative w-full md:w-[35%] h-[45vh] md:h-[60vh]"
          onMouseMove={moveLens}
          onMouseLeave={onMouseLeavesImage}
        >
          <img
            ref={mainImage}
            src={image}
            className="h-full w-full object-cover rounded-xl "
            alt=""
          />
          <div
            ref={lens}
            className="lens h-30 w-40 border-2 border-[#f58a25] bg-[#d37f0280] absolute top-0 opacity-0 rounded-xl"
          ></div>
        </div>

        {/* Right content */}
        <div className="image-2 w-full md:w-[65%] relative">
          <div
            ref={magnifiedImage}
            className="magnified-image absolute inset-0 rounded-xl h-[65vh] object-contain hidden z-20"
          />
          {/* Let children flow normally */}
          <div className="relative z-10">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ImageZoom;
