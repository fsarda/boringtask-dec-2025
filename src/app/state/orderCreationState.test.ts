import { Side } from "@/types/orders";
import {
  OrderFormState,
  OrderFormAction,
  orderFormReducer,
} from "./orderCreationState";

type Scenario = {
  scenarioName: string;
  initial: OrderFormState;
  action: OrderFormAction;
  expected: OrderFormState;
};

const scenarios: Scenario[] = [
  {
    scenarioName:
      "empty state and market selection, should default to collateral instrument",
    initial: {
      market: undefined,
      side: Side.BUY,
      amount: "",
      derivedAmount: "",
      quantityValid: true,
      price: "",
      instrument: "",
    },
    action: {
      type: "change_market",
      payload: {
        name: "BTC-USD",
        syntheticName: "BTC",
        syntheticPrecision: 5,
        collateralName: "USD",
        collateralPrecision: 1,
      },
    },
    expected: {
      market: {
        name: "BTC-USD",
        syntheticName: "BTC",
        syntheticPrecision: 5,
        collateralName: "USD",
        collateralPrecision: 1,
      },
      side: Side.BUY,
      amount: "",
      derivedAmount: "",
      quantityValid: false,
      instrument: "USD",
      price: "",
    },
  },
  {
    scenarioName: "Market selected and new price received should update price",
    initial: {
      market: {
        name: "BTC-USD",
        syntheticName: "BTC",
        syntheticPrecision: 5,
        collateralName: "USD",
        collateralPrecision: 1,
      },
      side: Side.BUY,
      amount: "",
      derivedAmount: "",
      quantityValid: false,
      instrument: "USD",
      price: "",
    },
    action: {
      type: "change_price",
      payload: 1.45,
    },
    expected: {
      market: {
        name: "BTC-USD",
        syntheticName: "BTC",
        syntheticPrecision: 5,
        collateralName: "USD",
        collateralPrecision: 1,
      },
      side: Side.BUY,
      amount: "",
      derivedAmount: "",
      quantityValid: false,
      instrument: "USD",
      price: "1.45000",
    },
  },
  {
    scenarioName:
      "Market selected and collateral amount filled should calculate synthetic amount and format properly both",
    initial: {
      market: {
        name: "BTC-USD",
        syntheticName: "BTC",
        syntheticPrecision: 5,
        collateralName: "USD",
        collateralPrecision: 1,
      },
      side: Side.BUY,
      amount: "",
      derivedAmount: "",
      quantityValid: false,
      instrument: "USD",
      price: "0.5",
    },
    action: {
      type: "change_amount",
      payload: "10",
    },
    expected: {
      market: {
        name: "BTC-USD",
        syntheticName: "BTC",
        syntheticPrecision: 5,
        collateralName: "USD",
        collateralPrecision: 1,
      },
      side: Side.BUY,
      amount: "10.0",
      derivedAmount: "20.00000",
      quantityValid: true,
      instrument: "USD",
      price: "0.5",
    },
  },
  {
    scenarioName:
      "instrument selected and changed to another instrument should recalculate derived amount",
    initial: {
      market: {
        name: "BTC-USD",
        syntheticName: "BTC",
        syntheticPrecision: 5,
        collateralName: "USD",
        collateralPrecision: 1,
      },
      side: Side.BUY,
      amount: "10.0",
      derivedAmount: "20.00000",
      quantityValid: true,
      instrument: "USD",
      price: "0.50000",
    },
    action: {
      type: "change_market",
      payload: {
        name: "ETH-EUR",
        syntheticName: "ETH",
        syntheticPrecision: 3,
        collateralName: "EUR",
        collateralPrecision: 1,
      },
    },
    expected: {
      market: {
        name: "ETH-EUR",
        syntheticName: "ETH",
        syntheticPrecision: 3,
        collateralName: "EUR",
        collateralPrecision: 1,
      },
      side: Side.BUY,
      amount: "10.0",
      derivedAmount: "",
      quantityValid: false,
      instrument: "EUR",
      price: "",
    },
  },
  {
    scenarioName:
      "Market selected and changing instruments should recalculate  derived amount",
    initial: {
      market: {
        name: "BTC-USD",
        syntheticName: "BTC",
        syntheticPrecision: 3,
        collateralName: "USD",
        collateralPrecision: 1,
      },
      side: Side.BUY,
      amount: "10.0",
      derivedAmount: "20.00000",
      quantityValid: true,
      instrument: "USD",
      price: "0.50000",
    },
    action: {
      type: "change_instrument",
      payload: "BTC",
    },
    expected: {
      market: {
        name: "BTC-USD",
        syntheticName: "BTC",
        syntheticPrecision: 3,
        collateralName: "USD",
        collateralPrecision: 1,
      },
      side: Side.BUY,
      amount: "10.000",
      derivedAmount: "5.0",
      quantityValid: true,
      instrument: "BTC",
      price: "0.50000",
    },
  },
];

describe("orderFormReducer", () => {
  it.each(scenarios)("$scenarioName", async ({ initial, action, expected }) => {
    expect(orderFormReducer(initial, action)).toStrictEqual(expected);
  });
});
