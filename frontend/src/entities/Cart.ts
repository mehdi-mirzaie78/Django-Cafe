interface SimpleProduct {
  id: string;
  name: string;
}
interface CartItem {
  id: string;
  product: SimpleProduct;
  quantity: number;
}

interface Cart {
  id: string;
  items: CartItem[];
  totalPrice: 0;
}

export default Cart;
