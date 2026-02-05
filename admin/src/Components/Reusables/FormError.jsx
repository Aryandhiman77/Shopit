import React from "react";

const FormError = ({ error, className }) => {
  return <p className={`text-red-500 text-[12px] ${className}`}>{error}</p>;
};

export default FormError;
