import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Market } from "@/types/markets";
import { InstrumentSelector } from "./InstrumentSelector";
import { Info } from "./Info";
import { FieldWrapper } from "./FieldWrapper";
import { cn } from "@/lib/utils";

export type AmountInputProps = {
  onMarketChange: (market: string) => void;
  onAmountChange: (value: string) => void;
  label?: string;
  initialValue: string;
  market?: Market;
  error: boolean;
  selectedInstrument: string;
} & Omit<React.ComponentProps<typeof Input>, "value">;
export const AmountInput = ({
  market,
  onAmountChange,
  initialValue,
  label,
  error = false,
  onMarketChange,
  selectedInstrument,
  ...props
}: AmountInputProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [internalValue, setInternalValue] = useState<string>(initialValue);

  useEffect(() => {
    if (!isFocused) {
      setInternalValue(initialValue);
    }
  }, [initialValue]);

  return (
    <FieldWrapper label={label || ""}>
      <div className="flex gap-2">
        {market && (
          <InstrumentSelector
            onMarketChange={onMarketChange}
            collateralName={market.collateralName}
            syntheticName={market.syntheticName}
            currentName={selectedInstrument}
            disabled={props.disabled}
          />
        )}
        <Input
          {...props}
          aria-label="amount"
          disabled={!market || props.disabled}
          className={cn("w-auto", { error: error && !props.disabled })}
          type="text"
          value={!isFocused ? initialValue : internalValue}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => setInternalValue(e.target.value)}
          onBlur={() => {
            setIsFocused(false);
            onAmountChange(internalValue);
          }}
        />
        {!market && !props.disabled && (
          <Info message="Please select a market to be able to introduce input" />
        )}
        {error && !props.disabled && (
          <Info message="Please introduce a valid quantity" />
        )}
      </div>
    </FieldWrapper>
  );
};
