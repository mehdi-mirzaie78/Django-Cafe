import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import APIClient from "../services/apiClient";

const apiClient = new APIClient("accounts/auth/register/verify/");

const useRegisterVerify = () => {
  const navigate = useNavigate();

  return useMutation<any, AxiosError, { phone: string; otp: string }>({
    mutationKey: ["register-verify"],
    mutationFn: ({ phone, otp }) => apiClient.post({ phone, otp }),
    onSuccess: () => {
      navigate("/register/complete");
    },
  });
};

export default useRegisterVerify;
