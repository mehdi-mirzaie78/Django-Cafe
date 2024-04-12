import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useProductQueryStore } from "../store";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const setSearchText = useProductQueryStore((s) => s.setSearchText);
  const navigate = useNavigate();

  return (
    <Box width={{ base: "60%", md: "80%" }}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (ref.current) setSearchText(ref.current.value);
          navigate("/");
        }}
      >
        <InputGroup>
          <InputLeftElement children={<BsSearch size="15px" />} />
          <Input
            bg={useColorModeValue("white", "gray.800")}
            ref={ref}
            fontSize={{ base: "13px", md: "md" }}
            borderRadius={25}
            placeholder="Search"
          />
        </InputGroup>
      </form>
    </Box>
  );
};

export default SearchInput;
