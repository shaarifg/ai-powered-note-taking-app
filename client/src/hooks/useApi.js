import axios from "axios";
import { useCallback, useState } from "react";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Adds token if exists
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401
instance.interceptors.response.use(
  (res) => res.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/signin"; // Update path as per your app
    }
    return Promise.reject(error);
  }
);

export const useApi = () => {
  const [loading, setLoading] = useState(false);

  const callApi = useCallback(
    async ({ method = "GET", endpoint, data = {}, auth = true }) => {
      setLoading(true);
      try {
        const config = {
          url: endpoint,
          method,
        };

        if (method.toLowerCase() === "get") {
          config.params = data;
        } else {
          config.data = data;
        }

        // If auth is false, strip token header
        if (!auth) {
          config.headers = {
            "Content-Type": "application/json",
          };
        }

        const response = await instance(config);
        return response;
      } catch (err) {
        console.error("API error:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { callApi, loading };
};

export default useApi;
