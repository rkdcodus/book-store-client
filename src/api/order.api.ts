import { Order, OrderSheet } from "../models/order.model";
import { httpClient } from "./http";

export const order = async (orderData: OrderSheet) => {
  const response = await httpClient.post("/order", orderData);
  return response.data;
};

export const fetchOrder = async () => {
  const response = await httpClient.get<Order>("/order");
  return response.data;
};
