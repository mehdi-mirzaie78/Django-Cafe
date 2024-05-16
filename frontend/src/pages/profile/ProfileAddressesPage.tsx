import { Box, useColorModeValue } from "@chakra-ui/react";

const AddressesPage = () => {
  const border = useColorModeValue("1px solid #e2e8f0", "1px solid #2d3748");
  return (
    <Box border={border} borderRadius={5} h="100%" p={5}>
      FavoriteProductsPage
    </Box>
  );
};

export default AddressesPage;
