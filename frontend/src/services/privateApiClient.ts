import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}

const baseURL = "http://127.0.0.1:8000/api/v1";
const axiosInstance = axios.create({ baseURL });

class PrivateAPIClient<T> {
  endpoint: string;
  config: AxiosRequestConfig;

  constructor(endpoint: string, config: AxiosRequestConfig) {
    this.endpoint = endpoint;
    this.config = config;
  }

  getAll = async () => {
    return await axiosInstance
      .get<FetchResponse<T>>(this.endpoint)
      .then((res) => res.data);
  };

  get = async (id: number | string) => {
    return axiosInstance
      .get<T>(`${this.endpoint}/${id}`, this.config)
      .then((res) => res.data);
  };

  post = async (data: object) => {
    return axiosInstance
      .post<T>(this.endpoint, data, this.config)
      .then((res) => res.data);
  };
}

export default PrivateAPIClient;
