import { Button } from "@chakra-ui/react";
import { ReactElement, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  basepath: string;
  pathname: string;
  leftIcon: ReactElement;
  children: ReactNode;
}

const SideBarButton = ({ basepath, pathname, leftIcon, children }: Props) => {
  const navigate = useNavigate();
  const path = basepath + pathname;
  return (
    <Button
      variant="ghost"
      size={{ base: "sm", lg: "md", xl: "lg" }}
      onClick={() => navigate(path)}
      leftIcon={leftIcon}
      width={"100%"}
      justifyContent={"start"}
      {...(window.location.pathname === path && {
        borderLeft: "4px solid #3182ce",
      })}
    >
      {children}
    </Button>
  );
};

export default SideBarButton;
