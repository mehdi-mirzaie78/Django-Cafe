import Loader from "../../components/Loader";
import useProfile from "../../hooks/profile/useProfile";

import {
  Box,
  Button,
  Grid,
  GridItem,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";

import { BiLogOut } from "react-icons/bi";
import {
  MdFavorite,
  MdLocationOn,
  MdPerson,
  MdRateReview,
  MdShoppingCart,
} from "react-icons/md";
import useLogout from "../../hooks/auth/useLogout";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { isLoading, data } = useProfile();
  const { mutate: logout } = useLogout();
  const border = useColorModeValue("1px solid #e2e8f0", "1px solid #2d3748");

  if (isLoading) return <Loader />;
  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={4}>
      <GridItem
        colSpan={1}
        p={4}
        height={"80vh"}
        border={border}
        borderRadius={5}
      >
        <Box mb={6}>
          <Text fontWeight="bold" mb={5} textAlign="center">
            {data?.firstName} {data?.lastName}
          </Text>
          <VStack align="start">
            <Button
              variant="ghost"
              onClick={() => navigate("")}
              leftIcon={<MdPerson />}
              width={"100%"}
              justifyContent={"start"}
            >
              User Info
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("favorite-products")}
              leftIcon={<MdFavorite />}
              width={"full"}
              justifyContent={"start"}
            >
              Favorite Products
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("orders")}
              leftIcon={<MdShoppingCart />}
              width={"full"}
              justifyContent={"start"}
            >
              Orders
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("reviews")}
              leftIcon={<MdRateReview />}
              width={"full"}
              justifyContent={"start"}
            >
              Reviews
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("addresses")}
              leftIcon={<MdLocationOn />}
              width={"full"}
              justifyContent={"start"}
            >
              Addresses
            </Button>
            <Button
              variant="ghost"
              onClick={() => logout()}
              leftIcon={<BiLogOut />}
              width={"full"}
              justifyContent={"start"}
            >
              Logout
            </Button>
          </VStack>
        </Box>
      </GridItem>

      <GridItem colSpan={4} p={8} border={border} borderRadius={5}>
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default ProfilePage;
