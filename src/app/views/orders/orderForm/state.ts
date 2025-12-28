import { Maybe } from "@/types/common";
import { Market } from "@/types/markets";
import { Side } from "@/types/orders";
import {
  formatter,
  fromCollateralToSynthetic,
  fromSyntheticToCollateral,
  isValidPositiveNumber,
} from "./utils";

export type OrderFormState = {
  market: Maybe<Market>;
  price: string;
  side: Side;
  synthetic_amount: string;
  collateral_amount: string;
  isCollateralAmount: boolean;
  quantityValid: boolean;
  marketValid: boolean;
};

export type OrderFormAction =
  | { type: "change_synthetic_amount"; payload: string }
  | { type: "change_collateral_amount"; payload: string }
  | { type: "change_side"; payload: Side }
  | { type: "change_market"; payload: Market }
  | { type: "change_price"; payload: number };

export const amountChangeReducer = (state: OrderFormState): OrderFormState => {
  const {
    synthetic_amount,
    collateral_amount,
    market,
    price,
    isCollateralAmount,
  } = state;
  const amount = isCollateralAmount ? collateral_amount : synthetic_amount;

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
      collateral_amount: isCollateralAmount
        ? formattedAmount
        : formattedDerivedAmount,
      synthetic_amount: !isCollateralAmount
        ? formattedAmount
        : formattedDerivedAmount,
      quantityValid: true,
    };
  } else {
    return {
      ...state,
      collateral_amount: isCollateralAmount ? state.collateral_amount : "",
      synthetic_amount: !isCollateralAmount ? state.synthetic_amount : "",
      quantityValid: false,
    };
  }
};

export const orderFormReducer = (
  state: OrderFormState,
  { type, payload }: OrderFormAction
): OrderFormState => {
  switch (type) {
    case "change_side":
      return { ...state, side: payload as Side };
    case "change_market":
      return amountChangeReducer({
        ...state,
        market: payload,
        price: "",
        marketValid: true,
      });
    case "change_collateral_amount":
      return amountChangeReducer({
        ...state,
        collateral_amount: payload,
        isCollateralAmount: true,
      });
    case "change_synthetic_amount":
      return amountChangeReducer({
        ...state,
        synthetic_amount: payload,
        isCollateralAmount: false,
      });
    case "change_price":
      return amountChangeReducer({ ...state, price: formatter(payload, 5) });
    default:
      return state;
  }
};
