import { faker } from "@faker-js/faker";

import { getMarketsName } from "../markets/data";
import {
  CreateOrderRequest,
  CreateOrderResponse,
  CreateOrderResponseCode,
  Order,
} from "../../types/orders";

export const ordersTable: Record<string, Order> = {};

export const createOrder = (
  orderRequest: CreateOrderRequest
): CreateOrderResponse => {
  const id = faker.string.uuid();
  const order = { id, ...orderRequest };
  const isMarketValid = getMarketsName().includes(order.market);

  if (!isMarketValid) {
    return { type: CreateOrderResponseCode.INVALID_MARKET, payload: undefined };
  }

  if (isNaN(order.price) || isNaN(order.qty)) {
    return { type: CreateOrderResponseCode.INVALID_PARAMS, payload: undefined };
  }

  ordersTable[id] = order;
  return { type: CreateOrderResponseCode.SUCCESS, payload: order };
};

export const getOrders = () => Object.values(ordersTable);
