import { Maybe } from "./common";

export type Side = "buy" | "sell";

export type Order = {
  id: string;
  market: string;
  side: Side;
  price: number;
  qty: number;
  hash: string;
};

export type CreateOrderRequest = Omit<Order, "id" | "hash">;

export enum CreateOrderResponseCode {
  "SUCCESS",
  "INVALID_MARKET",
  "INVALID_PARAMS",
}
export type CreateOrderResponse = {
  type: CreateOrderResponseCode;
  payload: Maybe<Order>;
};
