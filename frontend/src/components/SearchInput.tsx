import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <Box width={{ base: "60%", md: "80%" }}>
      <form onSubmit={(event) => {}}>
        <InputGroup>
          <InputLeftElement children={<BsSearch size="15px" />} />
          <Input
            bg={useColorModeValue("gray.50", "gray.700")}
            ref={ref}
            fontSize={{ base: "13px", md: "md" }}
            borderRadius={5}
            placeholder="Search"
            variant="filled"
          />
        </InputGroup>
      </form>
    </Box>
  );
};

export default SearchInput;
