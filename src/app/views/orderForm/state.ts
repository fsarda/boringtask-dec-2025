import { Maybe } from "@/types/common";
import { Market } from "@/types/markets";
import { Side } from "@/types/orders";
import {
  formatter,
  fromCollateralToSynthetic,
  fromSyntheticToCollateral,
  isValidPositiveNumber,
} from "@/components/trading/utils";

export type OrderFormState = {
  market: Maybe<Market>;
  price: string;
  side: Side;
  amount: string;
  derivedAmount: string;
  instrument: string;
  //This could be dismissed as it can be
  // derivated from other fields, keeping just for commodity
  quantityValid: boolean;
};

export type OrderFormAction =
  | { type: "change_amount"; payload: string }
  | { type: "change_side"; payload: Side }
  | { type: "change_market"; payload: Market }
  | { type: "change_price"; payload: number }
  | { type: "change_instrument"; payload: string };

export const amountChangeReducer = (state: OrderFormState): OrderFormState => {
  const { amount, market, price, instrument } = state;
  const isCollateralAmount = instrument === market?.collateralName;

  if (isValidPositiveNumber(amount) && isValidPositiveNumber(price)) {
    const derivateAmountCalc = isCollateralAmount
      ? fromCollateralToSynthetic
      : fromSyntheticToCollateral;
    const derivedPrecision = isCollateralAmount
      ? market?.syntheticPrecision
      : market?.collateralPrecision;
    const amountPrecision = isCollateralAmount
      ? market?.collateralPrecision
      : market?.syntheticPrecision;
    const numberAmount = parseFloat(amount);
    const numberPrice = parseFloat(price);
    const formattedDerivedAmount = formatter(
      derivateAmountCalc(numberAmount, numberPrice),
      derivedPrecision
    );
    const formattedAmount = formatter(numberAmount, amountPrecision);
    return {
      ...state,
      amount: formattedAmount,
      derivedAmount: formattedDerivedAmount,
      quantityValid: true,
    };
  } else {
    return {
      ...state,
      quantityValid: false,
    };
  }
};

export const orderFormReducer = (
  state: OrderFormState,
  action: OrderFormAction
): OrderFormState => {
  switch (action.type) {
    case "change_side":
      return { ...state, side: action.payload as Side };
    case "change_market":
      return amountChangeReducer({
        ...state,
        market: action.payload,
        price: "",
        derivedAmount: "",
        instrument: action.payload.collateralName,
      });
    case "change_amount":
      return amountChangeReducer({
        ...state,
        amount: action.payload,
      });
    case "change_instrument":
      return amountChangeReducer({
        ...state,
        instrument: action.payload,
      });
    case "change_price":
      return amountChangeReducer({
        ...state,
        price: formatter(action.payload, 5),
      });
    default:
      return state;
  }
};
