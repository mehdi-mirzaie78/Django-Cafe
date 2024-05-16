import Loader from "../../components/Loader";
import useProfile from "../../hooks/profile/useProfile";

import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Stack,
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
  const { isLoading, data } = useProfile();
  const { mutate: logout } = useLogout();
  const border = useColorModeValue("1px solid #e2e8f0", "1px solid #2d3748");

  if (isLoading) return <Loader />;

  return (
    <Stack
      direction={{ base: "column-reverse", md: "row" }}
      w={{ base: "95%", md: "100%" }}
      spacing={4}
      mx={"auto"}
    >
      <VStack
        p={4}
        height={"fit-content"}
        border={border}
        borderRadius={5}
        w={{ base: "100%", md: "31%", xl: "20%", "2xl": "16%" }}
        mx={"auto"}
        align={"start"}
      >
        <HStack p={3} justifyContent={"space-between"} mx={"auto"} w={"100%"}>
          <Box>
            <Text fontWeight="bold">
              {data?.firstName} {data?.lastName}
            </Text>
            <Text color={"gray"}>{data?.phone}</Text>
          </Box>
          <Link to="/profile/user-info">
            <Button variant={"ghost"} p={0}>
              <BiEdit size={22} />
            </Button>
          </Link>
        </HStack>

        <VStack align="start" w={"100%"}>
          <SideBarButton basepath="/profile" pathname="" leftIcon={<BiHome />}>
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
      </VStack>

      <VStack
        w={{ base: "100%", md: "69%", xl: "80%", "2xl": "84%" }}
        mx={"auto"}
      >
        <Outlet />
      </VStack>
    </Stack>
  );
};

export default ProfileLayoutPage;
