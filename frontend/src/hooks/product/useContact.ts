import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import Contact from "../../entities/Contact";
import APIClient from "../../services/apiClient";

const apiClient = new APIClient<Contact>("/contact/");

const useContact = () => {
  return useQuery({
    queryKey: ["contact"],
    queryFn: () => apiClient.get(),
    staleTime: ms("24h"),
  });
};

export default useContact;
