import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ms from "ms";
import { useNavigate } from "react-router-dom";
import Profile from "../../entities/Profile";
import PrivateAPIClient from "../../services/privateAPIClient";
import useAuthQueryStore from "../../store/authStore";

const useProfile = () => {
  const navigate = useNavigate();
  const { authQuery, setAuthQuery } = useAuthQueryStore();
  const privateAPIClient = new PrivateAPIClient<Profile>("/accounts/profile/");

  return useQuery<Profile, AxiosError>({
    queryKey: ["profile"],
    queryFn: () => privateAPIClient.get(),
    onError(err) {
      if (
        err.response?.status === 401 ||
        err.response?.status === 403 ||
        err.response?.status === 400
      ) {
        navigate("/login?redirect=/profile");
      }
    },
    onSuccess(data) {
      setAuthQuery({ ...authQuery, ...data });
    },
    staleTime: ms("2m"),
    retry: 1,
  });
};

export default useProfile;
