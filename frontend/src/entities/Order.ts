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
  orderType: string;
  table: string;
  createdAt: string;
  status: string | null;
  payment: number;
  orderItems: OrderItem[];
  totalPrice: string;
  isPaid: boolean;
}

export default Order;
