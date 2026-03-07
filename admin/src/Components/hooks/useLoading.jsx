import React, { useEffect, useState } from "react";

const useLoading = () => {
  const [loading, setLoading] = useState({});

  const startLoading = (key) => {
    setLoading((prev) => ({ ...prev, [key]: true }));
  };
  const stopLoading = (key) => {
    setLoading((prev) => ({ ...prev, [key]: false }));
  };
  const isLoading = (key) => {
    return loading[key] || false;
  };
  useEffect(() => {
    return () => {
      setLoading({});
    };
  }, []);
  console.log(loading);
  return { isLoading, startLoading, stopLoading };
};

export default useLoading;
