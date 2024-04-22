import { Box } from "@chakra-ui/react";
import Loader from "../components/Loader";
import useProfile from "../hooks/useProfile";

const ProfilePage = () => {
  const { isLoading, data, error } = useProfile();

  if (isLoading) return <Loader />;

  if (error) throw error;

  return (
    <Box>
      {data?.firstName} {data?.lastName}
    </Box>
  );
};

export default ProfilePage;
