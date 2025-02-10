import { Order, OrderSheet } from "../models/order.model";
import { requestHandler } from "./http";

export const order = async (orderData: OrderSheet) => {
  // const response = await httpClient.post("/order", orderData);
  // return response.data;
  return await requestHandler<OrderSheet>("post", "/order", orderData);
};

export const fetchOrder = async () => {
  // const response = await httpClient.get<Order>("/order");
  // return response.data;
  return await requestHandler<Order>("get", "/order");
};
