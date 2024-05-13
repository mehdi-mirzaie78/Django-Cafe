import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import PrivateAPIClient from "../services/privateAPIClient";
import useAuthQueryStore from "../store/authStore";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();

  const { authQuery, setAuthQuery } = useAuthQueryStore();

  const privateAPIClient = new PrivateAPIClient("accounts/auth/logout/");

  return useMutation<any, AxiosError>({
    mutationKey: ["logout"],
    mutationFn: () =>
      privateAPIClient.post({ refreshToken: authQuery.refreshToken }),
    onSettled: () => {
      setAuthQuery({});
      navigate("/login");
    },
  });
};

export default useLogout;
