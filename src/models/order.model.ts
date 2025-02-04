export interface OrderItem {
  bookId: number;
  title: string;
  summary: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  address: string;
  receiver: string;
  contact: string;
  total_price: number;
  created_at: string;
  orders: OrderItem[];
}
