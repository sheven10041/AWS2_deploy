import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export const clearAuthStorage = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("username");
};

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

let refreshPromise = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      originalRequest?._retry ||
      originalRequest?.url?.includes("/login/")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = axios
          .post(`${API_BASE_URL}/login/refresh/`, {}, { withCredentials: true })
          .then((response) => {
            const newAccessToken =
              response.data.accessToken ?? response.data.access;

            localStorage.setItem("accessToken", newAccessToken);
            return newAccessToken;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const newAccessToken = await refreshPromise;
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      clearAuthStorage();
      window.location.replace("/login");
      return Promise.reject(refreshError);
    }
  },
);

export default api;
