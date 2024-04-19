import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/v1";
export const axiosInstance = axios.create({ baseURL: baseURL });

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const auth = JSON.parse(localStorage.getItem("userInfo") || "{}");
    const accessToken = auth.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        let auth = JSON.parse(localStorage.getItem("userInfo") || "{}");
        const refreshToken = auth.refreshToken;

        const response = await axiosInstance.post(
          "/accounts/auth/refresh-token/",
          {
            refreshToken: refreshToken,
          }
        );
        const { accessToken } = response.data;
        const newAuth = { ...auth, accessToken: accessToken };

        localStorage.setItem("userInfo", JSON.stringify(newAuth));

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
