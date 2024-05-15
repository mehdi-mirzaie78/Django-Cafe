import { Box, Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NavBar from "../components/NavBar";
import PageNotFound from "./PageNotFound";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <NavBar />
      <Box
        marginTop={0}
        padding={5}
        textAlign={"center"}
        top={20}
        position={"relative"}
      >
        {isRouteErrorResponse(error) ? (
          <PageNotFound />
        ) : (
          <>
            <Heading>Oops</Heading>
            <Text marginY={3}>"An unexpected error occurred."</Text>
          </>
        )}
      </Box>
    </>
  );
};

export default ErrorPage;
