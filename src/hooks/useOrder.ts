import { useEffect, useState } from "react";
import { fetchOrder } from "../api/order.api";
import { Order } from "../models/order.model";

export const useOrder = () => {
  const [orders, setOrders] = useState<Order>({
    id: 0,
    address: "",
    receiver: "",
    contact: "",
    total_price: 0,
    created_at: "",
    orders: [],
  });

  useEffect(() => {
    fetchOrder().then((orders) => {
      setOrders(orders);
    });
  }, []);

  return { orders };
};
