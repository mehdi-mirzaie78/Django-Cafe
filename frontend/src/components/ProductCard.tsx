import { Card, CardBody, HStack, Heading, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import Product from "../entities/Product";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Card>
      <Image src={product.media[0].file} />
      <CardBody>
        <HStack justifyContent="space-between" marginBottom={3}></HStack>
        <Heading fontSize="2xl">
          <Link to={"/games/" + product.slug}>{product.name}</Link>
        </Heading>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
