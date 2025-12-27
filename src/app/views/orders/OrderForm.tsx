import { FormEventHandler, useReducer } from "react";
import { useCreateOrderRequest } from "../../../api-client/orders";
import { Side } from "../../../types/orders";
import { MarketPrice, MarketSelector } from "../market";

type OrderFormState = {
  market: string;
  side: Side;
  quantity: number;
  price: number;
  priceValid: boolean;
  quantityValid: boolean;
};

type OrderFormActionType =
  | "change_price"
  | "change_quantity"
  | "change_side"
  | "change_market";
type OrderFormAction = {
  type: OrderFormActionType;
  payload: string;
};

export const orderFormReducer = (
  state: OrderFormState,
  { type, payload }: OrderFormAction
): OrderFormState => {
  switch (type) {
    case "change_price":
      const price = parseFloat(payload);
      if (isNaN(price)) {
        return { ...state, priceValid: false };
      }

      return { ...state, priceValid: true, price };
    case "change_side":
      return { ...state, side: payload as Side };
    case "change_market":
      return { ...state, market: payload };
    case "change_quantity":
      const quantity = parseFloat(payload);
      if (isNaN(quantity)) {
        return { ...state, quantityValid: false };
      }

      return { ...state, quantityValid: true, quantity };
    default:
      return state;
  }
};

export const OrderForm = () => {
  const { isPending, send } = useCreateOrderRequest();
  const [state, dispatch] = useReducer(orderFormReducer, {
    market: "",
    side: "buy",
    price: 0,
    quantity: 0,
    priceValid: true,
    quantityValid: true,
  });

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    send({
      price: state.price,
      qty: state.quantity,
      market: state.market,
      side: state.side,
    });
  };

  return (
    <>
      {state.market && <MarketPrice selectedMarket={state.market} />}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <MarketSelector
          selectedMarket={state.market}
          onChange={(value) =>
            dispatch({ type: "change_market", payload: value })
          }
        />
        <select
          value={state.side}
          onChange={(event) =>
            dispatch({ type: "change_side", payload: event.target.value })
          }
        >
          <option value={"buy"}>buy</option>
          <option value={"sell"}>sell</option>
        </select>
        <input
          name="quantity"
          type="number"
          value={state.quantity}
          onChange={(event) =>
            dispatch({ type: "change_quantity", payload: event.target.value })
          }
          style={!state.priceValid ? { border: "1px solid red" } : {}}
        />
        <input
          name="price"
          type="number"
          value={state.price}
          onChange={(event) =>
            dispatch({ type: "change_price", payload: event.target.value })
          }
          style={!state.quantityValid ? { border: "1px solid red" } : {}}
        />
        <button
          type="submit"
          disabled={
            isPending ||
            !state.priceValid ||
            !state.quantityValid ||
            !state.market
          }
        >
          {isPending ? "Sending order" : "Send Order"}
        </button>
      </form>
    </>
  );
};
