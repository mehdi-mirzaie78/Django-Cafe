import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  count: number;
  previous?: string | null;
  next?: string | null;
  results: T[];
}

export const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (config: AxiosRequestConfig = {}) => {
    return await axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };

  get = async (id?: number | string) => {
    if (id)
      return axiosInstance
        .get<T>(this.endpoint + "/" + id + "/")
        .then((res) => res.data);
    return axiosInstance.get<T>(this.endpoint).then((res) => res.data);
  };

  post = async (data: object) => {
    return axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
  };

  patch = async (id: number | string, data: object) => {
    return axiosInstance
      .patch<T>(this.endpoint + "/" + id + "/", data)
      .then((res) => res.data);
  };

  delete = async (id: number | string) => {
    return axiosInstance
      .delete<T>(this.endpoint + "/" + id + "/")
      .then((res) => res.data);
  };
}

export default APIClient;
