import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

const MAX_RETRY = 3;

let globalAbortController = new AbortController();
const getGlobalSignal = () => globalAbortController.signal;

const abortRequests = (reason = "Network Error") => {
  globalAbortController.abort(reason);
  globalAbortController = new AbortController();
};
let toastId = null;
window.addEventListener("offline", () => {
  toastId = toast.error("You are currently offline.", { duration: Infinity });
});
window.addEventListener("online", () => {
  toast.dismiss(toastId);
  globalAbortController = new AbortController();
  toast.success("Connected to network.");
});

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

let retryCount = 0;
let isRefreshing = false;

/* ================= RESPONSE INTERCEPTOR ================= */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === "ERR_NETWORK") {
      abortRequests("Cannot reach servers.");
    }
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      retryCount < MAX_RETRY
    ) {
      originalRequest._retry = true;
      retryCount++;

      try {
        if (!isRefreshing) {
          isRefreshing = true;
          await api.patch("/auth/refresh-access");
          isRefreshing = false;
        }

        return api(originalRequest);
      } catch (err) {
        isRefreshing = false;
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

/*-------------------Request Interceptors ------------------*/
api.interceptors.request.use((config) => {
  config.signal = getGlobalSignal();
  return config;
});

/* ================= GENERIC REQUEST ================= */
export const fetchData = async ({
  url,
  method = "GET",
  payload = {},
  params = {},
  signal,
  isFormData = false,
}) => {
  try {
    const res = await api({
      url,
      method,
      data: payload,
      params,
      headers: isFormData ? undefined : { "Content-Type": "application/json" },
    });
    retryCount = 0;
    return res.data;
  } catch (err) {
    if (err.code === "ERR_NETWORK") {
      toast.error("Cannot connect to server.");
      return { error: err };
    }
    if (err.name === "CanceledError") {
      console.log("Request aborted:", err.message);
      return;
    }
    const apiErrors = err?.response?.data?.errors;
    if (Array.isArray(apiErrors) && apiErrors.length > 0) {
      return { formErrors: apiErrors };
    }

    if (err.status === 429) {
      toast.error("Too many requests, please wait.");
      return { error: err };
    }
    const message =
      err.response?.data?.message || err.message || "Something went wrong";
    toast.error(message);
    return { error: err };
    // throw err;
  }
};

export default api;
