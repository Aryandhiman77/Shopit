import React from "react";
import FormError from "../../FormError";
import Box from "../Box";
import { MdError } from "react-icons/md";

const BackendErrors = ({ formErrors = [] }) => {
  return (
    <>
      {formErrors && Array.from(formErrors).length !== 0 && (
        <Box className={"bg-red-200 space-y-1 my-2"}>
          <div className="flex items-center gap-2">
            <MdError size={30} className="text-red-600" />
            <p>Check the following Errors !</p>
          </div>
          {formErrors?.map((err, i) => (
            <div key={`error-${i}`}>
              <div className="flex items-center gap-4">
                <FormError error={err} />
              </div>
            </div>
          ))}
        </Box>
      )}
    </>
  );
};

export default BackendErrors;
