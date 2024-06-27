import axios, { AxiosError } from "axios";
import useAuthQueryStore from "../store/authStore";

const baseURL = "http://127.0.0.1:8000/api/v1";
export const axiosInstance = axios.create({ baseURL: baseURL });

const usePrivateAxios = () => {
  const { authQuery, setAuthQuery, resetAuthQuery } = useAuthQueryStore();
  let { accessToken, refreshToken } = authQuery;

  axiosInstance.interceptors.request.use(
    (config) => {
      let local_accessToken = JSON.parse(
        localStorage.getItem("userInfo") || "{}"
      ).accessToken;

      accessToken =
        authQuery.accessToken !== local_accessToken
          ? local_accessToken
          : accessToken;

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
          refreshToken =
            refreshToken ||
            JSON.parse(localStorage.getItem("userInfo") || "{}").refreshToken;
          const response = await axiosInstance.post(
            "/accounts/auth/refresh-token/",
            {
              refreshToken: refreshToken,
            }
          );
          const { accessToken } = response.data;
          setAuthQuery({ ...authQuery, accessToken: accessToken });

          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        } catch (error: AxiosError | any) {
          if ([400, 401, 403].includes(error.response?.status)) {
            console.log("resetting auth query");
            resetAuthQuery();
          }
          console.log("error", error);
        }
      }

      return Promise.reject(error);
    }
  );
  return axiosInstance;
};
export default usePrivateAxios;
