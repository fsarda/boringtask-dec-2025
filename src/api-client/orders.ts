import {
  CreateOrderRequest,
  CreateOrderResponse,
  Order,
} from "../types/orders";
import { useRequest, useRequestResponse } from "./patterns";

export const useCreateOrderRequest = () =>
  useRequestResponse<CreateOrderRequest, CreateOrderResponse>({
    url: "/api/v1/orders",
  });

export const useOrders = () =>
  useRequest<Order[]>({
    url: "/api/v1/orders",
    key: "orders",
    longPolling: true,
  });
