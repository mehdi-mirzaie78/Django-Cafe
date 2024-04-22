import axios from "axios";
import useAuthQueryStore from "../store/authStore";

const baseURL = "http://127.0.0.1:8000/api/v1";
export const axiosInstance = axios.create({ baseURL: baseURL });

const usePrivateAxios = () => {
  const { authQuery, setAuthQuery } = useAuthQueryStore();

  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = authQuery.accessToken;

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
          const refreshToken = authQuery.refreshToken;

          const response = await axiosInstance.post(
            "/accounts/auth/refresh-token/",
            {
              refreshToken: refreshToken,
            }
          );
          const { accessToken } = response.data;
          const newAuth = { ...authQuery, accessToken: accessToken };

          setAuthQuery(newAuth);

          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        } catch (error) {}
      }

      return Promise.reject(error);
    }
  );
  return axiosInstance;
};
export default usePrivateAxios;
