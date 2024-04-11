import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import APIClient from "../services/apiClient";

const apiClient = new APIClient("accounts/auth/register/");

const useRegister = () => {
  const navigate = useNavigate();

  return useMutation<any, AxiosError, string>({
    mutationKey: ["register"],
    mutationFn: (phone: string) => apiClient.post({ phone: phone }),
    onSuccess: () => {
      navigate("/register/verify");
    },
  });
};

export default useRegister;
