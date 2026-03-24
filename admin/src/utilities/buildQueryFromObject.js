const buildQueryFromObject = (obj) => {
  const params = new URLSearchParams();
  Object.entries(obj).forEach(([key, value]) => {
    if (
      value === null ||
      value === undefined ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return;
    }
    if (Array.isArray(value)) {
      params.set(key, value.join(","));
    } else {
      params.set(key, value);
    }
  });
  return params.toString();
};
export default buildQueryFromObject;
