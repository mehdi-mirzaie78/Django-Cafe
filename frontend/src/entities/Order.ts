interface Product {
  id: number;
  slug: string;
  name: string;
  medias: string[];
}

interface OrderItem {
  id: number;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
  product: Product;
}

interface Order {
  id: number;
  user: number;
  createdAt: string;
  status: string | null;
  payment: number;
  orderItems: OrderItem[];
}

export default Order;
