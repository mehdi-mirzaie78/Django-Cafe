import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import { BiCart, BiLogIn, BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";
import NavItem from "./NavItem";
import SearchInput from "./SearchInput";
import useRegisterQueryStore from "../store/registerStore";

const Links = [
  { name: "Login", path: "login", icon: <BiLogIn size={20} /> },
  { name: "Register", path: "register", icon: <BiUser size={20} /> },
  { name: "Cart", path: "cart", icon: <BiCart size={22} /> },
];

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box bg={useColorModeValue("gray.50", "gray.700")} px={4} py={1}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack alignItems={"center"}>
            <HStack>
              <Box
                marginRight={{ base: 2, md: 3 }}
                marginLeft={{ base: 3, md: 0 }}
              >
                <Link to="/">
                  <Image
                    src={logo}
                    boxSize={{ base: "38px", md: "50px" }}
                    rounded={"50%"}
                    objectFit="cover"
                  />
                </Link>
              </Box>
              <SearchInput />
            </HStack>
            <HStack
              as={"nav"}
              spacing={1}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavItem
                  key={link.name}
                  name={link.name}
                  path={link.path}
                  icon={link.icon}
                />
              ))}
            </HStack>
          </HStack>

          <HStack spacing={{ base: 2, sm: 3 }}>
            <Button
              onClick={toggleColorMode}
              padding={0}
              rounded={"50%"}
              bg="none"
            >
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
                  size={{ base: "sm", md: "md" }}
                  src={"https://avatars.dicebear.com/api/male/username.svg"}
                />
              </MenuButton>
              <MenuList alignItems={"center"}>
                <br />
                <Center>
                  <Avatar
                    size={{ base: "xl", md: "2xl" }}
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

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavItem
                  key={link.name}
                  name={link.name}
                  path={link.path}
                  icon={link.icon}
                />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default NavBar;
