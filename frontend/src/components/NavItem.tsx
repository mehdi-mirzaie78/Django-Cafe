import { Button, Text, useColorModeValue } from "@chakra-ui/react";
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
    <Button
      variant={"ghost"}
      px={2}
      py={1}
      fontWeight={"normal"}
      borderRadius={25}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.150", "gray.650"),
      }}
    >
      {children}
    </Button>
  );
};

const convertToTitle = (text: string) =>
  text[0].toUpperCase() + text.substring(1);

const NavItem = ({ name, path, icon }: NavItemProps) => {
  return (
    <Link to={path} style={{ display: "flex", alignItems: "center" }}>
      <NavLink key={name}>
        {icon} <Text ps={2}>{convertToTitle(name)}</Text>
      </NavLink>
    </Link>
  );
};

export default NavItem;
