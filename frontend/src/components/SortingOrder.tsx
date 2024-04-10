import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useProductQueryStore } from "../store";

const orderingList = [
  { name: "Date Added (Earliest First)", filtering: "updated_at" },
  { name: "Date Added (Latest First)", filtering: "-updated_at" },
  { name: "Price (Low to High)", filtering: "price" },
  { name: "Price (High to Low)", filtering: "-price" },
];

const SortingOrder = () => {
  const setOrdering = useProductQueryStore((s) => s.setOrdering);
  const ordering = useProductQueryStore((s) => s.productQuery.ordering);
  const orderingTitle = orderingList.find(
    (item) => item.filtering === ordering
  )?.name;

  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="outline"
        size={{ base: "xs", md: "sm", xl: "md" }}
        rightIcon={<ChevronDownIcon />}
        overflow={"hidden"}
      >
        {ordering ? orderingTitle : "Sorting"}
      </MenuButton>
      <MenuList>
        {orderingList.map((item) => (
          <MenuItem
            fontSize={{ base: "xs", md: "sm", xl: "md" }}
            key={item.name}
            onClick={() => setOrdering(item.filtering)}
          >
            {item.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SortingOrder;
