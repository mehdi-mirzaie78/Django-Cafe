import { HStack, Text } from "@chakra-ui/react";
import { BsStar } from "react-icons/bs";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

interface Props {
  value: number;
  text?: string;
  color?: string;
}

interface StarProps {
  value: number;
  num: number;
  color?: string;
}

const Star = ({ value, num, color = "gold" }: StarProps) => {
  return (
    <span>
      {value >= num ? (
        <FaStar color={color} />
      ) : value >= num - 0.5 ? (
        <FaStarHalfAlt color={color} />
      ) : (
        <BsStar color={color} />
      )}
    </span>
  );
};

const Rating = ({ value, text }: Props) => {
  return (
    <HStack spacing={0} alignContent={"center"}>
      <Text me={1} mt={1} fontSize={"small"}>
        {value}
      </Text>
      {[...Array(5)].map((i, index) => (
        <Star key={index} value={value} num={index + 1} />
      ))}
      {text && <span>{text}</span>}
    </HStack>
  );
};

export default Rating;
