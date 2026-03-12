import React, { useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";

const LoadingWrapper = async ({ setLoading,loadingKey, asyncFn }) => {
  setLoading((prev) => ({
    ...prev,
    [loadingKey]: (prev[loadingKey] || 0) + 1,
  }));
  try {
    return await asyncFn();
  } finally {
    setLoading((prev) => ({
      ...prev,
      [loadingKey]: Math.max((prev[loadingKey] || 1) - 1, 0),
    }));
  }
};

export default LoadingWrapper;
