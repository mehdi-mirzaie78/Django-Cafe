import { Box, useColorModeValue } from "@chakra-ui/react";

const ProfileReviewsPage = () => {
  const border = useColorModeValue("1px solid #e2e8f0", "1px solid #2d3748");
  return (
    <Box border={border} borderRadius={5} h="100%" w="100%" p={5}>
      Reviews
    </Box>
  );
};

export default ProfileReviewsPage;
