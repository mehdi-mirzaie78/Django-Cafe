import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import PrivateAPIClient from "../services/privateAPIClient";
import useAuthQueryStore from "../store/authStore";

const useLogout = () => {
  const { authQuery, setAuthQuery } = useAuthQueryStore();

  const privateAPIClient = new PrivateAPIClient("accounts/auth/logout/");

  return useMutation<any, AxiosError>({
    mutationKey: ["logout"],
    mutationFn: () =>
      privateAPIClient.post({ refreshToken: authQuery.refreshToken }),
    onSuccess: () => {
      setAuthQuery({});
    },
  });
};

export default useLogout;
