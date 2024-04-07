import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";
import SearchInput from "./SearchInput";

interface Props {
  children: ReactNode;
}

const NavLink = (props: Props) => {
  const { children } = props;

  return (
    <Box
      p={2}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      {children}
    </Box>
  );
};

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box px={4} py={2}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={5}>
            <Link to="/">
              <Image
                src={logo}
                boxSize="50px"
                rounded="5px"
                objectFit="cover"
              />
            </Link>
            <NavLink>
              <Link to="login">Login</Link>
            </NavLink>
          </HStack>
          <SearchInput />

          <HStack spacing={7}>
            <Button onClick={toggleColorMode} p={0} rounded={"50%"}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>

            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"md"}
                  src={"https://avatars.dicebear.com/api/male/username.svg"}
                />
              </MenuButton>
              <MenuList alignItems={"center"}>
                <br />
                <Center>
                  <Avatar
                    size={"2xl"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </Center>
                <br />
                <Center>
                  <p>Username</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>Your Servers</MenuItem>
                <MenuItem>Account Settings</MenuItem>
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </Box>
    </>
  );
};

export default NavBar;
