import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import PrivateAPIClient from "../services/privateApiClient";
import useAuthQueryStore from "../store/authStore";

const useLogout = () => {
  const { authQuery, setAuthQuery } = useAuthQueryStore();
  const config = {
    headers: { Authorization: `Bearer ${authQuery.accessToken}` },
  };

  const privateAPIClient = new PrivateAPIClient(
    "accounts/auth/logout/",
    config
  );

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
