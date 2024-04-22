import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { LoginFormData } from "../components/LoginForm";
import APIClient from "../services/apiClient";
import useAuthQueryStore from "../store/authStore";

const apiClient = new APIClient("accounts/auth/login/");

const useLogin = () => {
  const navigate = useNavigate();
  const setAuthQuery = useAuthQueryStore((s) => s.setAuthQuery);

  return useMutation<any, AxiosError, LoginFormData>({
    mutationKey: ["login"],
    mutationFn: (data) => apiClient.post(data),
    onSuccess: (data) => {
      const { accessToken, refreshToken, firstName, lastName } = data;
      setAuthQuery({ accessToken, refreshToken, firstName, lastName });
      navigate("/home");
    },
  });
};

export default useLogin;
