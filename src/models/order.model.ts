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

export interface OrderSheet {
  orderSheet: OrderSheetDelivery;
  orderIds: number[];
}

export type OrderSummary = {
  orderSheet: {
    totalPrice: number;
  };
  orderIds: number[];
  totalQuantity: number;
};

export interface Delivery {
  address: string;
  receiver: string;
  contact: string;
}

export interface OrderSheetDelivery extends Delivery {
  totalPrice: number;
}
