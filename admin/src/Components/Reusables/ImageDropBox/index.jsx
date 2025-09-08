import React, { useState, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";

const ImageDropBox = ({ setImages, maxFiles = 5 }) => {
  const [previews, setPreviews] = useState([]);
  const dropRef = useRef(null);

  const handleFiles = (files) => {
    let newFiles = Array.from(files);

    // Limit number of files
    if (previews.length + newFiles.length > maxFiles) {
      newFiles = newFiles.slice(0, maxFiles - previews.length);
    }

    const newPreviews = newFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setPreviews((prev) => {
      const updated = [...prev, ...newPreviews];
      setImages(updated.map((item) => item.file));
      return updated;
    });
  };

  const handleFileChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    dropRef.current.classList.add("border-blue-500", "bg-gray-100");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    dropRef.current.classList.remove("border-blue-500", "bg-gray-100");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    dropRef.current.classList.remove("border-blue-500", "bg-gray-100");
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (index) => {
    const updated = previews.filter((_, i) => i !== index);
    setPreviews(updated);
    setImages(updated.map((item) => item.file));
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        ref={dropRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 transition-all"
      >
        <input
          type="file"
          accept="image/*"
          multiple={maxFiles > 1}
          className="hidden"
          id="dropzone-file"
          onChange={handleFileChange}
        />

        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
        >
          {previews.length > 0 ? (
            <div className="flex flex-row flex-wrap gap-4 mt-2">
              {previews.map((item, index) => (
                <div key={index} className="relative w-48 h-48">
                  <img
                    src={item.url}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover rounded border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition"
                  >
                    <AiOutlineClose size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <>
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG(Max {maxFiles} images)
              </p>
            </>
          )}
        </label>
      </div>
    </div>
  );
};

export default ImageDropBox;
