import { useCreateOrderRequest } from "@/api-client/orders";
import { MarketPrice, MarketSelector } from "@/app/views/market";
import { TypographyP } from "@/components/typography-p";
import { AmountInput } from "@/components/ui/AmountInput";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Side } from "@/types/orders";
import { FormEventHandler, useReducer } from "react";

import { orderFormReducer } from "./state";
import { MessageCircleWarningIcon } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Info } from "./Info";
import { SideSelector } from "./SideSelector";
import { FieldWrapper } from "./FieldWrapper";

export const OrderForm = () => {
  const { isPending, send } = useCreateOrderRequest();
  const [state, dispatch] = useReducer(orderFormReducer, {
    market: undefined,
    side: Side.BUY,
    collateral_amount: "",
    synthetic_amount: "",
    quantityValid: true,
    isCollateralAmount: true,
    marketValid: false,
    price: "",
  });
  const disableSubmit = isPending || !state.quantityValid || !state.marketValid;

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    const {
      collateral_amount,
      market,
      isCollateralAmount,
      synthetic_amount,
      side,
      quantityValid,
      marketValid,
      price,
    } = state;

    if (!market || !marketValid || !quantityValid) {
      return;
    }

    send({
      price: parseFloat(price),
      qty: isCollateralAmount
        ? parseFloat(collateral_amount)
        : parseFloat(synthetic_amount),
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
        <FieldWrapper label="Market">
          <MarketSelector
            name="market"
            selectedMarket={state.market}
            onChange={(value) =>
              dispatch({ type: "change_market", payload: value })
            }
          />
        </FieldWrapper>

        <FieldWrapper label="Price">
          {state.market ? (
            <MarketPrice
              selectedMarket={state.market.name}
              onPriceChange={(price) =>
                dispatch({ type: "change_price", payload: price })
              }
            />
          ) : (
            <TypographyP>No market selected</TypographyP>
          )}
        </FieldWrapper>
        <FieldWrapper label="Side">
          <SideSelector
            name="side"
            value={state.side}
            onValueChange={(value: Side) =>
              dispatch({ type: "change_side", payload: value })
            }
          />
        </FieldWrapper>
        <FieldWrapper label="">
          <AmountInput
            market={state.market?.collateralName}
            name="collateral_amount"
            initialValue={state.collateral_amount}
            onCommit={(value) =>
              dispatch({
                type: "change_collateral_amount",
                payload: value,
              })
            }
            error={!state.quantityValid && state.isCollateralAmount}
            disabled={!state.marketValid}
          />
          {!state.marketValid && (
            <Info message="Please select a market to be able to introduce input" />
          )}
          {!state.quantityValid && state.isCollateralAmount && (
            <Info message="Please introduce a valid quantity" />
          )}
        </FieldWrapper>
        <FieldWrapper label="">
          <AmountInput
            market={state.market?.syntheticName}
            name="synthetic_amount"
            initialValue={state.synthetic_amount}
            onCommit={(value) =>
              dispatch({
                type: "change_synthetic_amount",
                payload: value,
              })
            }
            error={!state.quantityValid && !state.isCollateralAmount}
            disabled={!state.marketValid}
          />
          {!state.marketValid && (
            <Info message="Please select a market to be able to introduce input" />
          )}
          {!state.quantityValid && !state.isCollateralAmount && (
            <Info message="Please introduce a valid quantity" />
          )}
        </FieldWrapper>
        <FieldWrapper label="">
          <Button type="submit" disabled={disableSubmit}>
            {isPending ? "Sending order" : "Send Order"}
          </Button>
          {disableSubmit && (
            <Info message="Please introduce valid markets and amounts to send an order" />
          )}
        </FieldWrapper>
      </FieldGroup>
    </form>
  );
};
