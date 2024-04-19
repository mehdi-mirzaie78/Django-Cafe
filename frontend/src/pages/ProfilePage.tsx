import { useEffect } from "react";
import { axiosInstance } from "../services/privateAPI";

const ProfilePage = () => {
  useEffect(() => {
    axiosInstance.get("/accounts/profile/");
  }, []);

  return <div>Profile Page</div>;
};

export default ProfilePage;
