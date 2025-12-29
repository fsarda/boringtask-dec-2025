import {
  formatter,
  fromCollateralToSynthetic,
  fromSyntheticToCollateral,
  isValidPositiveNumber,
} from "./utils";

describe("utils for order state", () => {
  describe("isValidPositiveNumber", () => {
    it.each([
      { amount: "1.55502", expected: true },
      { amount: "ab233", expected: false },
      { amount: "-ab233", expected: false },
      { amount: "-23", expected: false },
      { amount: "0", expected: false },
      { amount: "-0", expected: false },
      { amount: "0.000000001", expected: true },
    ])("$amount is valid: $expected", async ({ amount, expected }) => {
      expect(isValidPositiveNumber(amount)).toBe(expected);
    });
  });

  describe("fromCollateralToSynthetic", () => {
    it.each([
      { amount: 4.5, price: 3, expected: 1.5 },
      { amount: 10, price: 2.5, expected: 4.0 },
      { amount: 10, price: 100, expected: 0.1 },
      { amount: 10, price: 0, expected: NaN },
    ])(
      "Synthetic derived amount is: $expected",
      async ({ amount, price, expected }) => {
        expect(fromCollateralToSynthetic(amount, price)).toBe(expected);
      }
    );
  });

  describe("fromSyntheticToCollateral", () => {
    it.each([
      { amount: 1.5, price: 3, expected: 4.5 },
      { amount: 10, price: 2.5, expected: 25 },
      { amount: 10, price: 100, expected: 1000 },
      { amount: 10, price: 0, expected: 0 },
    ])(
      "Collateral derived amount is: $expected",
      async ({ amount, price, expected }) => {
        expect(fromSyntheticToCollateral(amount, price)).toBe(expected);
      }
    );
  });

  describe("formatter", () => {
    it.each([
      { amount: 1.5, precision: 3, expected: "1.500" },
      { amount: 1.5, expected: "1.50" },
      { amount: 1.5, precision: 5, expected: "1.50000" },
    ])(
      "$amount is valid: $expected",
      async ({ amount, precision, expected }) => {
        expect(formatter(amount, precision)).toBe(expected);
      }
    );
  });
});
