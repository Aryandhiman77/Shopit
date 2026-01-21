import axios from "axios";
import { useCallback, useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";

const useAxios = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => {
      return Promise.reject(error);
    },
  );

  let controllerRef = useRef(new AbortController());

  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
    };
  }, []);

  const fetchData = useCallback(
    async ({ url, method, payload = {}, params = {} }) => {
      setLoading(true);

      controllerRef.current?.abort();
      controllerRef.current = new AbortController();

      try {
        const result = await axiosInstance({
          url,
          method,
          data: payload,
          params,
          signal: controllerRef.current.signal,
        });
        setResponse(result.data);
        return { response: result.data };
      } catch (error) {
        if (error.name === "CanceledError") {
          console.log("Request cancelled");
          return;
        }
        let errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [],
  );
  return { response, error, loading, fetchData };
};

export default useAxios;
