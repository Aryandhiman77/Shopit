import React from "react";

const ConvertToFormData = (details) => {
  const formData = new FormData();
  Object.entries(details).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
};

export default ConvertToFormData;
