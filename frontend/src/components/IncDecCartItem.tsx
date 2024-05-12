import { InputGroup, Button, Text, useToast } from "@chakra-ui/react";
import { BiCart } from "react-icons/bi";

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
  name: string;
  handleUpdateCartItem: (data: ItemInput) => void;
  handleRemoveCartItem: (id: number) => void;
  justify?: string;
}

const IncDecCartItem = ({
  item,
  name,
  handleUpdateCartItem,
  handleRemoveCartItem,
  justify = "center",
}: Props) => {
  const toast = useToast({
    position: "bottom",
    isClosable: true,
    icon: <BiCart size={20} />,
  });

  return (
    <InputGroup justifyContent={justify}>
      <Button
        colorScheme="red"
        size={{ base: "xs", md: "sm" }}
        variant="outline"
        onClick={() => {
          if (item.quantity === 1) {
            toast({
              title: `${name} removed from your cart`,
              status: "error",
            });

            handleRemoveCartItem(item.id);
          } else
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
