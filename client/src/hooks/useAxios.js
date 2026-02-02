import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const MAX_RETRY = 3;

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

const useAxios = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState([]);

  const controllerRef = useRef(new AbortController());
  const retryCountRef = useRef(0);
  const isRefreshingRef = useRef(false);

  /* ================= INTERCEPTOR (ONCE) ================= */
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (res) => res,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          retryCountRef.current < MAX_RETRY
        ) {
          originalRequest._retry = true;
          retryCountRef.current++;

          try {
            if (!isRefreshingRef.current) {
              isRefreshingRef.current = true;
              await axiosInstance.patch("/auth/refresh-access");
              isRefreshingRef.current = false;
            }
            return axiosInstance(originalRequest);
          } catch (err) {
            isRefreshingRef.current = false;
            return Promise.reject(err);
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, []);

  /* ================= FETCH FUNCTION ================= */
  const fetchData = useCallback(
    async ({ url, method = "GET", payload = {}, params = {} }) => {
      setLoading(true);
      setError(null);
      setFormErrors([]);

      controllerRef.current.abort();
      controllerRef.current = new AbortController();

      try {
        const res = await axiosInstance({
          url,
          method,
          data: payload,
          params,
          signal: controllerRef.current.signal,
        });

        retryCountRef.current = 0;
        setResponse(res.data);
        return res.data;
      } catch (err) {
        if (axios.isCancel(err)) return;

        const apiErrors = err?.response?.data?.errors;
        // Field-level validation errors
        if (Array.isArray(apiErrors) && apiErrors.length > 0) {
          setFormErrors(apiErrors);
          return;
        }

        const message =
          err.response?.data?.message || err.message || "Something went wrong";
        setError(message);
        toast.error(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    return () => controllerRef.current.abort();
  }, []);

  return { fetchData, response, formErrors, loading, error };
};

export default useAxios;
