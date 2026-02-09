import React, { useState, useRef, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

const ImageDropBox = ({
  setImages,
  maxFiles = 5,
  resetDropBox,
  setResetDropBox,
  initialImages = [], // 👈 STATIC URLS FROM BACKEND
}) => {
  const dropRef = useRef(null);

  const [previews, setPreviews] = useState(() =>
    initialImages.map((url) => ({
      url,
      isRemote: true,
    })),
  );

  /* ================= FILE HANDLING ================= */

  const handleFiles = (files) => {
    let newFiles = Array.from(files);

    if (previews.length + newFiles.length > maxFiles) {
      newFiles = newFiles.slice(0, maxFiles - previews.length);
    }

    const newPreviews = newFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      isRemote: false,
    }));

    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleFileChange = (e) => {
    handleFiles(e.target.files);
  };

  /* ================= DRAG EVENTS ================= */

  const handleDragOver = (e) => {
    e.preventDefault();
    dropRef.current.classList.add("border-blue-500", "bg-gray-100");
  };

  const handleDragLeave = () => {
    dropRef.current.classList.remove("border-blue-500", "bg-gray-100");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleDragLeave();
    handleFiles(e.dataTransfer.files);
  };

  /* ================= REMOVE IMAGE ================= */

  const removeImage = (index) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  /* ================= SYNC FILES TO PARENT ================= */
  // ONLY SEND FILES (backend already has remote ones)

  useEffect(() => {
    const filesOnly = previews.filter((p) => !p.isRemote).map((p) => p.file);

    setImages(filesOnly);
  }, [previews, setImages]);

  /* ================= RESET ================= */

  useEffect(() => {
    if (resetDropBox) {
      setPreviews([]);
      setResetDropBox(false);
    }
  }, [resetDropBox, setResetDropBox]);

  /* ================= CLEANUP ================= */

  useEffect(() => {
    return () => {
      previews.forEach((item) => {
        if (!item.isRemote) URL.revokeObjectURL(item.url);
      });
    };
  }, []);

  /* ================= UI ================= */

  return (
    <div
      ref={dropRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="relative flex flex-wrap gap-2 w-full min-h-[200px] border-2 border-dashed rounded-lg p-3"
    >
      <input
        type="file"
        accept="image/*"
        multiple={maxFiles > 1}
        hidden
        id="dropzone-file"
        onChange={handleFileChange}
      />

      {previews.length === 1 ? (
        /* ===== SINGLE IMAGE FULL SIZE ===== */
        <div className="relative w-full h-full">
          <img
            src={previews[0].url}
            alt="preview"
            className="w-full h-full object-contain rounded"
          />
          <button
            onClick={() => removeImage(0)}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-500 hover:text-white z-10"
          >
            <AiOutlineClose size={16} />
          </button>
        </div>
      ) : (
        /* ===== MULTIPLE IMAGES GRID ===== */
        <>
          {previews.map((item, index) => (
            <div key={index} className="relative w-24 h-24">
              <img
                src={item.url}
                alt=""
                className="w-full h-full object-cover rounded border"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow hover:bg-red-500 hover:text-white"
              >
                <AiOutlineClose size={12} />
              </button>
            </div>
          ))}
        </>
      )}

      {previews.length < maxFiles && (
        <label
          htmlFor="dropzone-file"
          className="w-24 h-24 flex items-center justify-center border rounded cursor-pointer text-gray-400 hover:bg-gray-100"
        >
          <p className="text-sm">Add {maxFiles === 1 ? "Image" : "Images"}</p>
        </label>
      )}
    </div>
  );
};

export default ImageDropBox;
