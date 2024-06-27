import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ms from "ms";
import Table from "../../entities/Table";
import APIClient, { FetchResponse } from "../../services/apiClient";

const apiClient = new APIClient<Table>("/tables/");
const useTables = () =>
  useQuery<FetchResponse<Table>, AxiosError>({
    queryKey: ["tables"],
    queryFn: () => apiClient.getAll(),
    staleTime: ms("24h"),
  });

export default useTables;
