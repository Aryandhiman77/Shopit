import React, { useEffect, useState } from "react";
import ImageDropBox from "../../../../Components/Reusables/ImageDropBox";
import Box from "../../../../Components/Reusables/Elements/Box";
import FormError from "../../../../Components/Reusables/FormError";
import CustomButton from "../../../../Components/Reusables/Elements/CustomBtn";
import useProducts from "../../../../Components/hooks/useProducts";
import Modal from "../../../../Components/Reusables/Elements/Modal";
import Spinner from "../../../../Components/Reusables/Elements/Loader/Spinner";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
const Images = ({
  setValue,
  errors,
  productId = "69a5d4566921dcce78e89cfd",
}) => {
  const thumb = JSON.parse(localStorage.getItem("draftProduct")).thumbnail;
  const gall = JSON.parse(localStorage.getItem("draftProduct")).gallery;
  const [thumbnail, setThumbnail] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [isUploaded, setIsUploaded] = useState({
    thumbnail: false,
    gallery: false,
  });
  const { uploadThumbnail, uploadGallery, loading } = useProducts();

  const setImageDataToLocalStorage = (key, uploaded) => {
    let productData = JSON.parse(localStorage.getItem("draftProduct"));
    productData = { ...productData, [key]: uploaded };
    console.log(productData);
    localStorage.setItem("draftProduct", JSON.stringify(productData));
  };

  const handleUpload = async (name) => {
    let uploaded;
    if (!productId) {
      toast.error("No product found.");
    }
    if (name === "thumbnail") {
      uploaded = await uploadThumbnail(productId, thumbnail[0]);
      if (uploaded) {
        let modifiedField = { ...isUploaded, thumbnail: true };
        setIsUploaded(modifiedField);
        setImageDataToLocalStorage(name, uploaded);
        setValue("thumbnail", uploaded, { shouldValidate: true });
      }
    }
    if (name === "gallery") {
      uploaded = await uploadGallery(productId, gallery);
      if (uploaded) {
        let modifiedField = { ...isUploaded, gallery: true };
        setIsUploaded(modifiedField);
        setImageDataToLocalStorage(name, uploaded);
        setValue("gallery", gallery, { shouldValidate: true });
      }
    }
  };

  useEffect(() => {
    let uploaded = { ...isUploaded, thumbnail: false };
    setIsUploaded(uploaded);
  }, [thumbnail]);

  useEffect(() => {
    let uploaded = { ...isUploaded, gallery: false };
    setIsUploaded(uploaded);
  }, [gallery]);

  return (
    <Box className="w-full mb-25! bg-white!">
      <div className="font-medium text-gray-500 text-lg pb-4">
        Product Images
      </div>
      <h3 className="px-1 py-3 text-sm font-[500]">Product Thumbnail</h3>
      <div className="w-50!">
        <ImageDropBox
          maxFiles={1}
          setImages={setThumbnail}
          initialImages={[thumb]}
        />
        <FormError error={errors?.thumbnail?.message} />
        {Object.keys(thumbnail).length > 0 && (
          <div className="flex items-center gap-4">
            <CustomButton
              disabled={loading}
              title={"Upload"}
              onClick={() => handleUpload("thumbnail")}
              className={"rounded-xl! px-4! text-[12px]! my-2!"}
              textPadding={1}
            />
          </div>
        )}
        {isUploaded.thumbnail && (
          <div className="text-green-600 flex items-center gap-2">
            <FaCheckCircle />
            <p>Uploaded</p>
          </div>
        )}
      </div>
      <h3 className="px-1 py-3 text-sm font-[500]">Product Gallery</h3>
      <ImageDropBox maxFiles={10} setImages={setGallery} initialImages={gall} />
      {gallery.length > 0 && !isUploaded.gallery && (
        <CustomButton
          disabled={loading}
          title={"Upload"}
          onClick={() => handleUpload("gallery")}
          className={"rounded-xl! px-4! text-[12px]! my-2!"}
          textPadding={1}
        />
      )}
      <FormError error={errors?.gallery?.message} />
      {isUploaded.gallery && (
        <div className="text-green-600 flex items-center gap-2">
          <FaCheckCircle />
          <p>Uploaded</p>
        </div>
      )}
      <Modal
        header={false}
        open={loading}
        fixedFullScreen={true}
        className="bg-[rgba(255,255,255,0.6)]! transition-all duration-200"
      >
        <div className="h-[100vh] flex justify-center items-center">
          <Spinner size={40} />
        </div>
      </Modal>
    </Box>
  );
};

export default Images;
