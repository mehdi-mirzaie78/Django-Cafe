import { InputGroup, Button, Text } from "@chakra-ui/react";

interface Item {
  id: number;
  quantity: number;
}

interface ItemInput {
  itemId: number;
  quantity: number;
}
interface Props {
  item: Item;
  handleUpdateCartItem: (data: ItemInput) => void;
  handleRemoveCartItem: (id: number) => void;
  justify?: string;
}

const IncDecCartItem = ({
  item,
  handleUpdateCartItem,
  handleRemoveCartItem,
  justify = "center",
}: Props) => {
  return (
    <InputGroup justifyContent={justify}>
      <Button
        colorScheme="red"
        size={{ base: "xs", md: "sm" }}
        variant="outline"
        onClick={() => {
          if (item.quantity === 1) handleRemoveCartItem(item.id);
          else
            handleUpdateCartItem({
              itemId: item.id,
              quantity: item.quantity - 1,
            });
        }}
      >
        -
      </Button>

      <Text alignContent={"center"} paddingX={{ base: 2, md: 4 }}>
        {item.quantity}
      </Text>
      <Button
        colorScheme="green"
        size={{ base: "xs", md: "sm" }}
        variant="outline"
        onClick={() =>
          handleUpdateCartItem({
            itemId: item.id,
            quantity: item.quantity + 1,
          })
        }
      >
        +
      </Button>
    </InputGroup>
  );
};

export default IncDecCartItem;
