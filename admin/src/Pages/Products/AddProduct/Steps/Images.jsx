import React, { useState } from "react";
import ImageDropBox from "../../../../Components/Reusables/ImageDropBox";

const Images = () => {
  const [thumbnail, setThumbnail] = useState([]);
  const [gallery, setGallery] = useState([]);
  return (
    <div className="w-full">
      <h1 className="heading-1 px-1 py-2">Product Images</h1>
      <h3 className="px-1 py-3 text-sm font-[500]">Product Thumbnail</h3>
      <ImageDropBox maxFiles={1} setImages={setThumbnail} />
      <h3 className="px-1 py-3 text-sm font-[500]">Product Gallery</h3>
      <ImageDropBox maxFiles={10} setImages={setGallery} />
    </div>
  );
};

export default Images;
