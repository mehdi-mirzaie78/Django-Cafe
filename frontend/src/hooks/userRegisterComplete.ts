import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { RegisterCompleteFormData } from "../components/RegisterCompleteForm";
import APIClient from "../services/apiClient";
import useAuthQueryStore from "../store/authStore";

const apiClient = new APIClient("accounts/auth/register/complete/");

interface Data {
  phone: string;
}

type RequestBody = RegisterCompleteFormData & Data;

const useRegisterComplete = () => {
  const navigate = useNavigate();
  const setAuthQuery = useAuthQueryStore((s) => s.setAuthQuery);

  return useMutation<any, AxiosError, RequestBody>({
    mutationKey: ["register-complete"],
    mutationFn: (data) => apiClient.post(data),
    onSuccess: (data) => {
      localStorage.removeItem("registerInfo");
      const { accessToken, refreshToken, firstName, lastName } = data;
      setAuthQuery({ accessToken, refreshToken, firstName, lastName });
      navigate("/home");
    },
  });
};

export default useRegisterComplete;
