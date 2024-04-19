import axiosInstance from "./privateAPI";

export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}
export class PrivateAPIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async () => {
    return await axiosInstance
      .get<FetchResponse<T>>(this.endpoint)
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
}

export default PrivateAPIClient;
