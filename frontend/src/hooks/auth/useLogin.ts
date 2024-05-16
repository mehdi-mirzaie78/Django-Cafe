import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginFormData } from "../../components/LoginForm";
import APIClient from "../../services/apiClient";
import useAuthQueryStore from "../../store/authStore";

const apiClient = new APIClient("accounts/auth/login/");

const useLogin = () => {
  const navigate = useNavigate();
  const setAuthQuery = useAuthQueryStore((s) => s.setAuthQuery);
  const location = useLocation();
  const redirectUrl = location.search.replace("?redirect=", "");

  return useMutation<any, AxiosError, LoginFormData>({
    mutationKey: ["login"],
    mutationFn: (data) => apiClient.post(data),
    onSuccess: (data) => {
      delete data.detail; // remove detail key from data

      setAuthQuery({ ...data });
      navigate(redirectUrl || "/home");
    },
  });
};

export default useLogin;
