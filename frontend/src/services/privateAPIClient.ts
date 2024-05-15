import { AxiosInstance } from "axios";
import usePrivateAxios from "./privateAPIHook";

export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}
export class PrivateAPIClient<T> {
  endpoint: string;
  axios: AxiosInstance;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.axios = usePrivateAxios();
  }

  getAll = async () => {
    return this.axios
      .get<FetchResponse<T>>(this.endpoint)
      .then((res) => res.data);
  };

  get = async (id?: number | string) => {
    if (id)
      return this.axios
        .get<T>(this.endpoint + "/" + id + "/")
        .then((res) => res.data);
    return this.axios.get<T>(this.endpoint).then((res) => res.data);
  };

  post = async (data: object) => {
    return this.axios.post<T>(this.endpoint, data).then((res) => res.data);
  };

  patch = async (data: object) => {
    return this.axios.patch<T>(this.endpoint, data).then((res) => res.data);
  };
}

export default PrivateAPIClient;
