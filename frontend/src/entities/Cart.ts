interface SimpleProduct {
  id: number;
  slug: string;
  name: string;
  medias: string[];
}
export interface CartItem {
  id: number;
  product: SimpleProduct;
  quantity: number;
  totalPrice: number;
}

interface Cart {
  id: string;
  items: CartItem[];
  totalPrice: 0;
}

export default Cart;
