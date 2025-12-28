import { Side } from "../../../../types/orders";
import { OrderFormAction, orderFormReducer, OrderFormState } from "./state";

type Scenario = {
  scenarioName: string;
  initial: OrderFormState;
  action: OrderFormAction;
  expected: OrderFormState;
};

const scenarios: Scenario[] = [
  {
    scenarioName: "empty state and market selection",
    initial: {
      market: undefined,
      side: Side.BUY,
      collateral_amount: "",
      synthetic_amount: "",
      quantityValid: true,
      isCollateralAmount: true,
      marketValid: false,
      price: "",
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
      collateral_amount: "",
      synthetic_amount: "",
      quantityValid: false,
      isCollateralAmount: true,
      marketValid: true,
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
      collateral_amount: "",
      synthetic_amount: "",
      quantityValid: false,
      isCollateralAmount: true,
      marketValid: true,
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
      collateral_amount: "",
      synthetic_amount: "",
      quantityValid: false,
      isCollateralAmount: true,
      marketValid: true,
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
      collateral_amount: "",
      synthetic_amount: "",
      quantityValid: false,
      isCollateralAmount: true,
      marketValid: true,
      price: "0.5",
    },
    action: {
      type: "change_collateral_amount",
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
      collateral_amount: "10.0",
      synthetic_amount: "20.00000",
      quantityValid: true,
      isCollateralAmount: true,
      marketValid: true,
      price: "0.5",
    },
  },
  {
    scenarioName:
      "Market selected and changed to another market should clear derived amount",
    initial: {
      market: {
        name: "BTC-USD",
        syntheticName: "BTC",
        syntheticPrecision: 5,
        collateralName: "USD",
        collateralPrecision: 1,
      },
      side: Side.BUY,
      collateral_amount: "10.0",
      synthetic_amount: "20.00000",
      quantityValid: true,
      isCollateralAmount: true,
      marketValid: true,
      price: "0.50000",
    },
    action: {
      type: "change_market",
      payload: {
        name: "ETH-USD",
        syntheticName: "ETH",
        syntheticPrecision: 3,
        collateralName: "USD",
        collateralPrecision: 1,
      },
    },
    expected: {
      market: {
        name: "ETH-USD",
        syntheticName: "ETH",
        syntheticPrecision: 3,
        collateralName: "USD",
        collateralPrecision: 1,
      },
      side: Side.BUY,
      collateral_amount: "10.0",
      synthetic_amount: "",
      quantityValid: false,
      isCollateralAmount: true,
      marketValid: true,
      price: "",
    },
  },
  {
    scenarioName:
      "Market selected and synthetic amount filled should calculate synthetic amount and format properly both",
    initial: {
      market: {
        name: "BTC-USD",
        syntheticName: "BTC",
        syntheticPrecision: 3,
        collateralName: "USD",
        collateralPrecision: 1,
      },
      side: Side.BUY,
      collateral_amount: "10.0",
      synthetic_amount: "20.00000",
      quantityValid: true,
      isCollateralAmount: true,
      marketValid: true,
      price: "0.50000",
    },
    action: {
      type: "change_synthetic_amount",
      payload: "10",
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
      collateral_amount: "5.0",
      synthetic_amount: "10.000",
      quantityValid: true,
      isCollateralAmount: false,
      marketValid: true,
      price: "0.50000",
    },
  },
  {
    scenarioName:
      "When synthetic amount is set, price update should update price and collateral amount",
    initial: {
      market: {
        name: "BTC-USD",
        syntheticName: "BTC",
        syntheticPrecision: 3,
        collateralName: "USD",
        collateralPrecision: 1,
      },
      side: Side.BUY,
      collateral_amount: "5.0",
      synthetic_amount: "10.000",
      quantityValid: true,
      isCollateralAmount: false,
      marketValid: true,
      price: "0.50000",
    },
    action: {
      type: "change_price",
      payload: 1,
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
      collateral_amount: "10.0",
      synthetic_amount: "10.000",
      quantityValid: true,
      isCollateralAmount: false,
      marketValid: true,
      price: "1.00000",
    },
  },
  {
    scenarioName:
      "When collateral amount is set, price update should update price and synthetic amount",
    initial: {
      market: {
        name: "BTC-USD",
        syntheticName: "BTC",
        syntheticPrecision: 3,
        collateralName: "USD",
        collateralPrecision: 1,
      },
      side: Side.BUY,
      collateral_amount: "5.0",
      synthetic_amount: "5.000",
      quantityValid: true,
      isCollateralAmount: true,
      marketValid: true,
      price: "1.00000",
    },
    action: {
      type: "change_price",
      payload: 2,
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
      collateral_amount: "5.0",
      synthetic_amount: "2.500",
      quantityValid: true,
      isCollateralAmount: true,
      marketValid: true,
      price: "2.00000",
    },
  },
];

describe("orderFormReducer", () => {
  it.each(scenarios)(
    "$initial with $actions becomes $expected",
    async ({ initial, action, expected }) => {
      expect(orderFormReducer(initial, action)).toStrictEqual(expected);
    }
  );
});
