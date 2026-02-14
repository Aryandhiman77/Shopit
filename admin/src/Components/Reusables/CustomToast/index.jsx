import React, { useEffect } from "react";
import Box from "../Elements/Box";
import toast from "react-hot-toast";
// toast for confirmation
const CustomToast = ({
  messageClasses,
  message = "Enter a message",
  toastId,
  buttonTitle="Save Changes",
  callFn = () => {},
}) => {
  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);
  return (
    <div className="absolute -top-[16px]  h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.8)] flex justify-center items-center">
      <Box className={"bg-white text-black dark:bg-gray-800 dark:text-white"}>
        <div className="space-y-4">
          <h1 className="text-red-400 text-center">Important notice!</h1>
          <p className={`font-normal text-center w-100 ${messageClasses}`}>
            {message}
          </p>
          <div className="btns flex gap-4 items-center justify-center">
            <button
              onClick={() => {
                toast.remove(toastId);
                callFn();
              }}
              className="custom-btn bg-green-600! text-white! w-full!"
            >
              {buttonTitle}
            </button>
            <button
              onClick={() => {
                toast.remove(toastId);
              }}
              className="custom-btn bg-red-600! text-white! w-full!"
            >
              Cancel
            </button>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default CustomToast;
