import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import Table from "../../entities/Table";
import APIClient from "../../services/apiClient";

const apiClient = new APIClient<Table>("/tables/");
const useTables = () =>
  useQuery({
    queryKey: ["tables"],
    queryFn: () => apiClient.getAll(),
    staleTime: ms("24h"),
  });

export default useTables;
