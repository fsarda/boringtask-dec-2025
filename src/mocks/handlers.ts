import { RequestHandler } from "msw";
import { MARKET_API_HANDLER } from "./markets";
import { ORDERS_API_HANDLER } from "./orders";

export const DEFAULT_HANDLERS: RequestHandler[] = [
  ...MARKET_API_HANDLER,
  ...ORDERS_API_HANDLER,
];
