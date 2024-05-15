import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import NavBar from "../components/NavBar";

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
          <Box textAlign="center" py={10} px={6}>
            <Heading
              display="inline-block"
              as="h2"
              size="2xl"
              bgGradient="linear(to-r, teal.400, teal.600)"
              backgroundClip="text"
            >
              404
            </Heading>
            <Text fontSize="18px" mt={3} mb={2}>
              Page Not Found
            </Text>
            <Text color={"gray.500"} mb={6}>
              The page you&apos;re looking for does not seem to exist
            </Text>

            <Link to="/home">
              <Button
                colorScheme="teal"
                bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
                color="white"
                variant="solid"
              >
                Go to Home
              </Button>
            </Link>
          </Box>
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
