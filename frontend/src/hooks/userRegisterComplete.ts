import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { RegisterCompleteFormData } from "../components/RegisterCompleteForm";
import APIClient from "../services/apiClient";

const apiClient = new APIClient("accounts/auth/register/complete/");

interface Data {
  phone: string;
}

type RequestBody = RegisterCompleteFormData & Data;

const useRegisterComplete = () => {
  const navigate = useNavigate();

  return useMutation<any, AxiosError, RequestBody>({
    mutationKey: ["register-complete"],
    mutationFn: (data) => apiClient.post(data),
    onSuccess: (data) => {
      localStorage.removeItem("registerInfo");
      const { accessToken, refreshToken, firstName, lastName } = data;
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ accessToken, refreshToken, firstName, lastName })
      );
      navigate("/");
    },
  });
};

export default useRegisterComplete;
