import Loader from "../components/Loader";
import useProfile from "../hooks/useProfile";

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

import {
  MdFavorite,
  MdLocationOn,
  MdPerson,
  MdRateReview,
  MdShoppingCart,
} from "react-icons/md";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { isLoading, data } = useProfile();

  if (isLoading) return <Loader />;
  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={4}>
      <GridItem
        colSpan={1}
        p={4}
        height={"80vh"}
        border={useColorModeValue("1px solid #e2e8f0", "1px solid #2d3748")}
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
            >
              User Info
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("favorite-products")}
              leftIcon={<MdFavorite />}
            >
              Favorite Products
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("orders")}
              leftIcon={<MdShoppingCart />}
            >
              Orders
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("reviews")}
              leftIcon={<MdRateReview />}
            >
              Reviews
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("addresses")}
              leftIcon={<MdLocationOn />}
            >
              Addresses
            </Button>
          </VStack>
        </Box>
      </GridItem>

      <GridItem
        colSpan={4}
        p={8}
        border={useColorModeValue("1px solid #e2e8f0", "1px solid #2d3748")}
        borderRadius={5}
      >
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default ProfilePage;
