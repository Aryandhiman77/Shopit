import axios from "axios";
import toast from "react-hot-toast";

let globalAbortController = new AbortController();

const abortRequests = () => {
  globalAbortController.abort();
  globalAbortController = new AbortController();
};

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

/* ================= RESPONSE INTERCEPTOR ================= */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === "ERR_NETWORK") {
      abortRequests("Cannot reach servers.");
    }
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.patch("/auth/refresh-access");
        return api(originalRequest);
      } catch (err) {
        // dispatch event for force logout when cannot refresh access
        console.log(window.location.pathname.includes("/login"));
        if (!window.location.pathname.includes("/login")) {
          window.dispatchEvent(new Event("ASK_LOGIN"));
        }

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

/*-------------------Request Interceptors ------------------*/
api.interceptors.request.use((config) => {
  config.signal = globalAbortController.signal;
  return config;
});

/* ================= GENERIC REQUEST ================= */
export const fetchData = async ({
  url,
  method = "GET",
  payload = {},
  params = {},
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
    return res.data;
  } catch (err) {
    if (err.code === "ERR_NETWORK") {
      const message = err.message.includes("Network Error")
        ? "Cannot reach servers."
        : err.message;
      toast.error(message);
      return { error: err };
    }
    if (err.name === "CanceledError") {
      console.log("Request aborted:", err.message);
      return;
    }
    const apiErrors = err?.response?.data?.errors;
    if (Array.isArray(apiErrors) && apiErrors.length > 0) {
      console.log(apiErrors);
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

// ================================== status handling ======================================
let toastId = null;
window.addEventListener("offline", () => {
  toastId = toast.error("You are currently offline.", { duration: Infinity });
});
window.addEventListener("online", () => {
  toast.dismiss(toastId);
  globalAbortController = new AbortController();
  toast.success("Connected to network.");
});

export default api;

// const BASE_URL = "http://localhost:8000/api";

// export const fetchData = async ({
//   url,
//   method,
//   headers,
//   payload,
//   isFormData,
// }) => {
//   const abortController = new AbortController();
//   const header = {
//     "Content-Type": "application/json",
//     signal: abortController.signal,
//   };
//   try {
//     const request = await fetch(`${BASE_URL}${url}`, {
//       method,
//       headers: isFormData ? {} : header,
//       credentials: "include",
//       body: isFormData ? payload : JSON.stringify(payload),
//     });

//     if (response.success) {
//       return response;
//     }
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };
