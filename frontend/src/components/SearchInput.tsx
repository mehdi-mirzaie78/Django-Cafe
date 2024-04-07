import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form onSubmit={(event) => {}} style={{ width: "50%" }}>
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={ref}
          borderRadius={5}
          placeholder="Search"
          variant="filled"
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
