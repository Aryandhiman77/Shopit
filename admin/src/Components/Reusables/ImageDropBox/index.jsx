import React, { useState, useRef, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

const ImageDropBox = ({
  setImages,
  maxFiles = 5,
  resetDropBox,
  setResetDropBox,
  initialImages = [],
  rearrange = false,
}) => {
  const dropRef = useRef(null);
  const dragItem = useRef(null);

  const [dragOverIndex, setDragOverIndex] = useState(null);

  const [previews, setPreviews] = useState(() =>
    initialImages.map((url) => ({
      url,
      isRemote: true,
    })),
  );

  /* FILE HANDLING */

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

  /* DRAG DROP FILES */

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  /* REORDER */

  const handleDragStart = (index) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index) => {
    if (index !== dragItem.current) {
      setDragOverIndex(index);
    }
  };

  const handleDragEnd = () => {
    if (dragOverIndex === null) return;

    const items = [...previews];
    const dragged = items[dragItem.current];

    items.splice(dragItem.current, 1);
    items.splice(dragOverIndex, 0, dragged);

    setPreviews(items);
    dragItem.current = null;
    setDragOverIndex(null);
  };

  /* REMOVE IMAGE */

  const removeImage = (index) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  /* SYNC FILES */

  useEffect(() => {
    const filesOnly = previews.filter((p) => !p.isRemote).map((p) => p.file);

    setImages(filesOnly);
  }, [previews, setImages]);

  /* RESET */

  useEffect(() => {
    if (resetDropBox) {
      setPreviews([]);
      setResetDropBox(false);
    }
  }, [resetDropBox, setResetDropBox]);

  /* CLEANUP */

  useEffect(() => {
    return () => {
      previews.forEach((item) => {
        if (!item.isRemote) URL.revokeObjectURL(item.url);
      });
    };
  }, []);

  return (
    <div
      ref={dropRef}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="relative flex flex-wrap gap-2 w-full min-h-[200px] border-2 border-dashed rounded-lg p-3"
    >
      <input
        type="file"
        accept="image/*"
        multiple={maxFiles > 1}
        hidden
        id={`dropzone-file-${maxFiles}`}
        onChange={handleFileChange}
      />

      {previews.map((item, index) => (
        <div
          key={index}
          className="relative w-24 h-24"
          draggable={rearrange}
          onDragStart={() => handleDragStart(index)}
          onDragEnter={() => handleDragEnter(index)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => e.preventDefault()}
        >
          {/* DROP INDICATOR */}
          {dragOverIndex === index && (
            <div className="absolute -left-1 top-0 h-full w-[3px] bg-blue-500 rounded"></div>
          )}

          <img
            src={item.url}
            alt=""
            className="w-full h-full object-contain rounded border"
          />

          {index === 0 && (
            <span className="absolute bottom-1 left-1 bg-black text-white text-xs px-1 rounded">
              Cover
            </span>
          )}

          <button
            type="button"
            onClick={() => removeImage(index)}
            className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow hover:bg-red-500 hover:text-white"
          >
            <AiOutlineClose size={12} />
          </button>
        </div>
      ))}

      {previews.length < maxFiles && (
        <label
          htmlFor={`dropzone-file-${maxFiles}`}
          className="w-24 h-24 flex items-center justify-center border rounded cursor-pointer text-gray-400 hover:bg-gray-100"
        >
          <p className="text-sm">Add Images</p>
        </label>
      )}
      {/* {
        rearrange && <p></p>
      } */}
      {rearrange && (
        <p className="absolute bottom-0 text-gray-500 font-medium text-[13px]">
          Drag the images to rearrange.
        </p>
      )}
    </div>
  );
};

export default ImageDropBox;
