import Loader from "../../components/Loader";
import useProfile from "../../hooks/profile/useProfile";

import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { BiEdit, BiHome, BiLogOut } from "react-icons/bi";
import {
  MdFavorite,
  MdLocationOn,
  MdPerson,
  MdRateReview,
  MdShoppingCart,
} from "react-icons/md";
import SideBarButton from "../../components/SideBarButton";
import useLogout from "../../hooks/auth/useLogout";

const ProfileLayoutPage = () => {
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
          <HStack p={3} mb={5} justifyContent={"space-between"}>
            <Box>
              <Text fontWeight="bold">
                {data?.firstName} {data?.lastName}
              </Text>
              <Text color={"gray"}>{data?.phone}</Text>
            </Box>
            <Link to="/profile/user-info">
              <Button variant={"ghost"} p={0}>
                <BiEdit size={26} />
              </Button>
            </Link>
          </HStack>
          <VStack align="start">
            <SideBarButton
              basepath="/profile"
              pathname=""
              leftIcon={<BiHome />}
            >
              Home
            </SideBarButton>

            <SideBarButton
              basepath="/profile"
              pathname="/favorite-products"
              leftIcon={<MdFavorite />}
            >
              Favorite Products
            </SideBarButton>

            <SideBarButton
              basepath="/profile"
              pathname="/orders"
              leftIcon={<MdShoppingCart />}
            >
              Orders
            </SideBarButton>

            <SideBarButton
              basepath="/profile"
              pathname="/reviews"
              leftIcon={<MdRateReview />}
            >
              Reviews
            </SideBarButton>

            <SideBarButton
              basepath="/profile"
              pathname="/user-info"
              leftIcon={<MdPerson />}
            >
              User Info
            </SideBarButton>

            <SideBarButton
              basepath="/profile"
              pathname="/addresses"
              leftIcon={<MdLocationOn />}
            >
              Addresses
            </SideBarButton>

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

      <GridItem colSpan={4}>
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default ProfileLayoutPage;
