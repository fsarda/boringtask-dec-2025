import { Order, Side } from "@/types/orders";
import { produce } from "immer";

export type Spread = {
  lowestSellPrice: number;
  higherBuyPrice: number;
};

export type OrderState = {
  orders: Order[];
  spread: Spread;
};

export type OrdersBookAction = { type: "add_new_order"; payload: Order };

export type OrdersBookState = Record<string, OrderState>;

export const calculateSpread = (order: Order, spread: Spread) => {
  if (!spread) {
    if (order.side === Side.BUY) {
      return {
        lowestSellPrice: 0,
        higherBuyPrice: order.price,
      };
    } else {
      return {
        lowestSellPrice: order.price,
        higherBuyPrice: 0,
      };
    }
  } else {
    if (order.side === Side.BUY) {
      return {
        lowestSellPrice: spread.lowestSellPrice,
        higherBuyPrice:
          spread.higherBuyPrice < order.price
            ? order.price
            : spread.higherBuyPrice,
      };
    } else {
      return {
        higherBuyPrice: spread.higherBuyPrice,
        lowestSellPrice:
          spread.lowestSellPrice > order.price
            ? order.price
            : spread.higherBuyPrice,
      };
    }
  }
};

export const initialValue = {};
export const ordersBookReducer = produce(
  (state: OrdersBookState, action: OrdersBookAction) => {
    switch (action.type) {
      case "add_new_order":
        if (!state[action.payload.market]) {
          state[action.payload.market] = {
            orders: [],
            spread: {
              lowestSellPrice: 0,
              higherBuyPrice: 0,
            },
          };
        }
        const marketBookState = state[action.payload.market];
        state[action.payload.market].orders.push(action.payload);
        state[action.payload.market].spread = calculateSpread(
          action.payload,
          marketBookState?.spread
        );
        break;
      default:
        break;
    }
  },
  initialValue
);
