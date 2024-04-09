import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import useProductQueryStore from "../store";
import { ChevronDownIcon } from "@chakra-ui/icons";

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
      <MenuButton as={Button} variant="outline" rightIcon={<ChevronDownIcon />}>
        {ordering ? orderingTitle : "Sorting"}
      </MenuButton>
      <MenuList>
        {orderingList.map((item) => (
          <MenuItem key={item.name} onClick={() => setOrdering(item.filtering)}>
            {item.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SortingOrder;
