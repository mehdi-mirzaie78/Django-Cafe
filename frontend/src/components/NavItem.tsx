import { Box, useColorModeValue, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface NavLinkProps {
  children: ReactNode;
}

interface NavItemProps {
  name: string;
  path: string;
  icon: ReactNode;
}

const NavLink = (props: NavLinkProps) => {
  const { children } = props;

  return (
    <Box
      px={2}
      py={1}
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

const NavItem = ({ name, path, icon }: NavItemProps) => {
  return (
    <NavLink key={name}>
      <Link to={path} style={{ display: "flex", alignItems: "center" }}>
        {icon} <Text ps={2}>{name}</Text>
      </Link>
    </NavLink>
  );
};

export default NavItem;
