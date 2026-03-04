const ConvertToFormData = (details) => {
  const formData = new FormData();

  Object.entries(details).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (item instanceof File) {
          formData.append(key, item);
        }
      });
    } else {
      formData.append(key, value);
    }
  });

  return formData;
};

export default ConvertToFormData;
