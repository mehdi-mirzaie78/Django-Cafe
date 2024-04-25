import { useEffect } from "react";
import useCart from "../hooks/useCart";
import useCartQueryStore from "../store/cartStore";

const CartPage = () => {
  const cartQuery = useCartQueryStore((s) => s.cartQuery);
  const { mutate } = useCart();

  useEffect(() => {
    mutate();
  }, []);

  return <div>cart {cartQuery.id}</div>;
};

export default CartPage;
