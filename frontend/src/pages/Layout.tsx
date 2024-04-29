import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <Box
      display={"flex"}
      minH={"100vh"}
      flexDirection={"column"}
      justifyContent={"flex-start"}
    >
      <NavBar />
      <Box padding={5} marginTop={20}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
