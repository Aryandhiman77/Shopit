import { useState } from "react";

const useLoading = () => {
  const [loading, setLoading] = useState({});

  const startLoading = (key) => {
    setLoading((prev) => ({ ...prev, [key]: true }));
  };
  const stopLoading = (key) => {
    setLoading((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };
  const isLoading = (key) => {
    return loading[key] || false;
  };

  return { isLoading, startLoading, stopLoading };
};

export default useLoading;
