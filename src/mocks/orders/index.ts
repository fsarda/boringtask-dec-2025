import { http, PathParams, RequestHandler } from "msw";
import {
  CreateOrderRequest,
  CreateOrderResponseCode,
} from "../../types/orders";
import {
  BAD_REQUEST_RESPONSE,
  NOT_FOUND_RESPONSE,
  SUCCESS_RESPONSE,
} from "../common";
import { createOrder, getOrders } from "./data";

const getAllOrders = http.get("/api/v1/orders", () => {
  return SUCCESS_RESPONSE(getOrders());
});

const postOrderRequest = http.post<PathParams, CreateOrderRequest>(
  "/api/v1/orders",
  async ({ request }) => {
    const orderRequest = await request.json();
    const { type, payload } = createOrder(orderRequest);

    if (type === CreateOrderResponseCode.SUCCESS) {
      return SUCCESS_RESPONSE(payload);
    } else if (type === CreateOrderResponseCode.INVALID_PARAMS) {
      return BAD_REQUEST_RESPONSE;
    } else {
      return NOT_FOUND_RESPONSE;
    }
  }
);

export const ORDERS_API_HANDLER: RequestHandler[] = [
  getAllOrders,
  postOrderRequest,
];
