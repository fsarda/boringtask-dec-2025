import { fireEvent, render, screen } from "@testing-library/react";
import { AmountInput } from "./AmountInput";
import { Market } from "@/types/markets";
import userEvent from "@testing-library/user-event";

const mockMarket: Market = {
  name: "BTC-USD",
  syntheticName: "BTC",
  syntheticPrecision: 3,
  collateralName: "USD",
  collateralPrecision: 1,
};

describe("AmountInput", () => {
  it("renders correctly", () => {
    render(
      <AmountInput
        onAmountChange={() => {}}
        initialValue={"10"}
        error={false}
        market={mockMarket}
        onMarketChange={() => {}}
        selectedInstrument={mockMarket.collateralName}
      />
    );

    expect(screen.findByText(mockMarket.syntheticName)).toBeDefined();
    expect(screen.findByDisplayValue("10")).toBeDefined();
  });

  it("should prevent changes when focused", async () => {
    let initialValue = "10";
    const onAmountChangeSpy = vi.fn((value) => {
      initialValue = value;
    });

    render(
      <AmountInput
        onAmountChange={onAmountChangeSpy}
        initialValue={initialValue}
        error={false}
        market={mockMarket}
        onMarketChange={() => {}}
        selectedInstrument={mockMarket.collateralName}
      />
    );

    const label = screen.getByText(mockMarket.syntheticName);
    expect(label).toBeDefined();
    expect(screen.findByDisplayValue("10")).toBeDefined();
    const input = screen.getByDisplayValue("10");
    await fireEvent.focus(input);
    await userEvent.clear(input);
    await userEvent.type(input, "20");
    expect(screen.findByDisplayValue("20")).toBeDefined();
    expect(initialValue).toBe("10");
  });

  it("should commit changes when blurred", async () => {
    let initialValue = "10";
    const onAmountChangeSpy = vi.fn((value) => {
      initialValue = value;
    });

    render(
      <AmountInput
        onAmountChange={onAmountChangeSpy}
        initialValue={initialValue}
        error={false}
        market={mockMarket}
        onMarketChange={() => {}}
        selectedInstrument={mockMarket.collateralName}
      />
    );

    const label = screen.getByText(mockMarket.syntheticName);
    expect(label).toBeDefined();
    expect(screen.findByDisplayValue("10")).toBeDefined();
    const input = screen.getByDisplayValue("10");
    await fireEvent.focus(input);
    await userEvent.clear(input);
    await userEvent.type(input, "20");
    expect(screen.findByDisplayValue("20")).toBeDefined();
    expect(initialValue).toBe("10");
    await userEvent.click(label);
    expect(onAmountChangeSpy).toHaveBeenCalledWith("20");
    expect(initialValue).toBe("20");
    expect(screen.findByDisplayValue("20")).toBeDefined();
  });

  it("should highlight error", async () => {
    render(
      <AmountInput
        onAmountChange={() => {}}
        initialValue={"10"}
        error
        market={mockMarket}
        onMarketChange={() => {}}
        selectedInstrument={mockMarket.collateralName}
      />
    );

    expect(await screen.findByDisplayValue("10")).toHaveClass("error");
  });

  it("should update if initial value changes and input is not focused", () => {
    let initialValue = "10";
    const onAmountChangeSpy = vi.fn((value) => {
      initialValue = value;
    });

    render(
      <AmountInput
        onAmountChange={onAmountChangeSpy}
        initialValue={initialValue}
        error={false}
        market={mockMarket}
        onMarketChange={() => {}}
        selectedInstrument={mockMarket.collateralName}
      />
    );

    expect(screen.findByDisplayValue("10")).toBeDefined();
    initialValue = "20";
    expect(screen.findByDisplayValue("20")).toBeDefined();
  });
});
