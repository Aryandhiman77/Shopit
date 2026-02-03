import axios from "axios";
import toast from "react-hot-toast";

const MAX_RETRY = 3;

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let retryCount = 0;
let isRefreshing = false;

/* ================= RESPONSE INTERCEPTOR ================= */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
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

/* ================= GENERIC REQUEST ================= */
export const fetchData = async ({
  url,
  method = "GET",
  payload = {},
  params = {},
  signal,
}) => {
  try {
    const res = await api({
      url,
      method,
      data: payload,
      params,
      signal,
    });

    retryCount = 0;
    return res.data;
  } catch (err) {
    const apiErrors = err?.response?.data?.errors;
    if (Array.isArray(apiErrors.length > 0)) {
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
