import { Box, Text, useColorModeValue } from "@chakra-ui/react";
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
      borderRadius={25}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.150", "gray.650"),
      }}
    >
      {children}
    </Box>
  );
};

const convertToTitle = (text: string) =>
  text[0].toUpperCase() + text.substring(1);

const NavItem = ({ name, path, icon }: NavItemProps) => {
  return (
    <NavLink key={name}>
      <Link to={path} style={{ display: "flex", alignItems: "center" }}>
        {icon} <Text ps={2}>{convertToTitle(name)}</Text>
      </Link>
    </NavLink>
  );
};

export default NavItem;
