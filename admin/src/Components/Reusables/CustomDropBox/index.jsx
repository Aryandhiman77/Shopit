import React, { useEffect, useRef, useState } from "react";
import upload from "../../../assets/upload.svg";
import { LuImageUp } from "react-icons/lu";
import { IoIosCloseCircle } from "react-icons/io";
import { _convertPasteOfficeCssLengthToPx } from "ckeditor5";

const sizes = {
  "1MB": Math.pow(1024, 2),
  "2MB": Math.pow(1024, 2) * 2,
  "3MB": Math.pow(1024, 2) * 3,
  "4MB": Math.pow(1024, 2) * 4,
};

const CustomDropBox = ({
  multiple = false,
  maxFiles = 1,
  sizePerFile = ["1MB", "2MB", "3MB", "4MB"][0],
  className,
  previewClasses,
  previewsWrapperClasses,
  allowedMimeTypes = ["image/png", "image/jpg", "image/jpeg"],
  getFiles = () => {},
  reset = false,
  setReset = () => {},
  initialPreviews = [],
}) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([...(initialPreviews || [])]);
  const styleRef = useRef(null);
  const inputRef = useRef(null);
  const difference = maxFiles - previews.length;

  const onDragEnter = (e) => {
    e.preventDefault();
  };
  const onDragLeaveCapture = (e) => {
    e.preventDefault();
    styleRef.current.style.background = "transparent";
  };
  const onDrop = (e) => {
    const addfiles = [...e.dataTransfer.files]?.slice(0, difference);
    styleRef.current.style.background = "transparent";

    handleSetFiles(addfiles);
  };

  const appendFilesAndGeneratePreviews = (newFiles) => {
    if (files?.length + newFiles.length <= maxFiles) {
      setFiles((prev) => [...prev, ...newFiles]);
      generatePreviews([...files, ...newFiles]);
    }
  };

  const handleSetFiles = (inputs) => {
    if (inputs && inputs.length === 0) {
      setFiles([...inputs]);
      generatePreviews(inputs);
    } else if (files && files.length + inputs.length <= maxFiles) {
      appendFilesAndGeneratePreviews([...inputs]);
    } else {
      setFiles([]);
      console.log([...inputs.slice(0, maxFiles)]);
      setFiles([...inputs.slice(0, maxFiles)]);
      generatePreviews([...inputs.slice(0, maxFiles)]);
    }
  };
  const handleReset = () => {
    console.log("reset");
    setReset(false);
    setFiles([]);
    setPreviews([]);
    if (inputRef.current) {
      inputRef.current.value = null;
    }
  };
  const generatePreviews = (files) => {
    let previews = Array.from(files).map((item) => {
      if (item instanceof File && typeof item === "object") {
        const providedSize = sizes[sizePerFile] || false;
        if (!allowedMimeTypes?.includes(item.type)) {
          return {
            filename: item.name,
            image: URL.createObjectURL(item),
            errorMessage: `Either ${allowedMimeTypes?.map((m) => "." + m.split("/")[1]).join(", ")} are allowed.`,
          };
        } else if (!providedSize || item.size <= providedSize) {
          return {
            filename: item.name,
            image: URL.createObjectURL(item),
          };
        } else if (item.size > providedSize) {
          return {
            filename: item.name,
            image: URL.createObjectURL(item),
            errorMessage: `file size greater than ${sizePerFile}`,
          };
        }
      }
      return;
    });
    setPreviews(previews);
  };
  const deleteFile = (i) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
    setPreviews((prev) => prev.filter((_, idx) => idx !== i));
    URL.revokeObjectURL(previews[i]?.image);
  };
  useEffect(() => {
    if (reset) {
      handleReset();
      setReset(false);
    }
  }, [reset]);
  useEffect(() => {
    return () => {
      previews?.forEach((p) => URL.revokeObjectURL(p?.image));
    };
  }, []);
  useEffect(() => {
    getFiles([...files?.filter((_, i) => !previews[i]?.errorMessage)]);
  }, [files]);
  return (
    <>
      {files?.length < maxFiles && previews.length < maxFiles && (
        <label
          id="image"
          className={`border border-dotted rounded-md flex justify-center items-center flex-col cursor-pointer transition-all duration-150 active:scale-95 ${className} `}
          ref={styleRef}
          onDragEnter={onDragEnter}
          onDragLeaveCapture={onDragLeaveCapture}
          onDragOver={(e) => {
            e.preventDefault();
            styleRef.current.style.background = "#e6f1f3";
          }}
          onDragOverCapture={(e) => {
            e.preventDefault();
          }}
          onDrop={onDrop}
          onDropCapture={(e) => e.preventDefault()}
        >
          <div className="flex justify-center items-center flex-col text-[#6b6771] p-3 select-none">
            <LuImageUp size={100} />
            <h1 className="font-semibold text-gray-400">
              Drag and drop or click here
            </h1>
            <p className="text-[14px]">
              to upload image {sizePerFile && `(max ${sizePerFile})`}
            </p>
            <p className="text-[14px]">
              Max {difference > 1 ? difference + " files" : "1 file"}
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            hidden
            onChange={(e) =>
              handleSetFiles([...e.target.files]?.slice(0, difference))
            }
            max={difference}
            multiple={difference > 1 || multiple}
            id="image"
            accept={allowedMimeTypes.toString()}
          />
        </label>
      )}
      <div
        className={`flex items-center gap-4 py-4 ${previewsWrapperClasses} w-full flex-wrap`}
      >
        {previews?.map((preview, i) => (
          <div
            key={`custom-dropbox-error-${i}`}
            className={`p-1 w-40 h-auto border border-gray-400 flex justify-center items-center mb-4 relative ${preview?.errorMessage ? "border-red-600 border-2" : "border border-gray-400 relative"} ${previewClasses}`}
          >
            <img
              className="w-full h-full object-contain aspect-square"
              src={preview?.image}
              alt=""
            />
            {preview?.errorMessage && (
              <p className="absolute bottom-0 text-red-600 text-[12px] text-center bg-white w-full">
                {preview.errorMessage}
              </p>
            )}
            <button
              onClick={() => deleteFile(i)}
              type="button"
              className="cursor-pointer absolute right-0 top-1"
            >
              <IoIosCloseCircle size={20} className="text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default CustomDropBox;
