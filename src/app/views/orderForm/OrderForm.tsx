import { FormEventHandler, useReducer } from "react";
import { Side } from "@/types/orders";
import { useCreateOrderRequest } from "@/api-client/orders";
import { FieldGroup } from "@/components/ui/field";
import { AmountInput } from "@/components/trading/AmountInput";
import { MarketPrice } from "@/components/trading/MarketPrice";
import { MarketSelector } from "@/components/trading/MarketSelector";
import { SendOrderButton } from "@/components/trading/SendOrderButton";
import { SideSelector } from "@/components/trading/SideSelector";
import { TypographyP } from "@/components/typography-p";

import { orderFormReducer } from "./state";

export const OrderForm = () => {
  const { isPending, mutate: send } = useCreateOrderRequest();
  const [state, dispatch] = useReducer(orderFormReducer, {
    market: undefined,
    side: Side.BUY,
    derivedAmount: "",
    amount: "",
    quantityValid: true,
    instrument: "",
    price: "",
  });
  const disableSubmit = isPending || !state.quantityValid || !state.market;

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    const { market, amount, side, quantityValid, price } = state;

    if (!market || !quantityValid) {
      return;
    }

    send({
      price: parseFloat(price),
      qty: parseFloat(amount),
      market: market.name,
      side: side,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <FieldGroup className="flex flex-col gap-4 ">
        <MarketSelector
          name="market"
          id="market"
          selectedMarket={state.market}
          onChange={(value) =>
            dispatch({ type: "change_market", payload: value })
          }
        />
        {state.market && (
          <MarketPrice
            market={state.market}
            onPriceChange={(price) =>
              dispatch({ type: "change_price", payload: price })
            }
          />
        )}
        <SideSelector
          name="side"
          value={state.side}
          onValueChange={(value: Side) =>
            dispatch({ type: "change_side", payload: value })
          }
        />
        <AmountInput
          label="Amount"
          market={state.market}
          selectedInstrument={state.instrument}
          name="amount"
          initialValue={state.amount}
          onMarketChange={(instrument: string) =>
            dispatch({
              type: "change_instrument",
              payload: instrument,
            })
          }
          onAmountChange={(value) =>
            dispatch({
              type: "change_amount",
              payload: value,
            })
          }
          error={!state.quantityValid}
          disabled={!state.market}
        />
        {state.market && (
          <AmountInput
            disabled
            market={state.market}
            selectedInstrument={
              state.instrument === state.market?.collateralName
                ? state.market?.syntheticName
                : state.market?.collateralName
            }
            name="derived-amount"
            initialValue={state.derivedAmount}
            error={!state.quantityValid}
            onMarketChange={() => {}}
            onAmountChange={() => {}}
          />
        )}
        <SendOrderButton
          amount={state.amount}
          instrument={state.instrument}
          marketValid={!!state.market}
          side={state.side}
          disabled={disableSubmit}
        />
      </FieldGroup>
    </form>
  );
};
