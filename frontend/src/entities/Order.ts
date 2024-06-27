interface Product {
  id: number;
  slug: string;
  name: string;
  price: string;
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
  user: string;
  createdAt: string;
  status: string;
  orderItems: OrderItem[];
  discount: number;
  totalPrice: 66.0;
  isPaid: boolean;
  orderType: string;
  table: string;
  phone: string | null;
  address: string | null;
  transactionCode: string;
}

export default Order;
