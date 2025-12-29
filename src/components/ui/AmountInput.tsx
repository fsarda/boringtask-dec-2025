import { useEffect, useState } from "react";
import { Input } from "./input";

export type AmountInputProps = {
  onCommit: (value: string) => void;
  initialValue: string;
  market?: string;
  error: boolean;
} & Omit<React.ComponentProps<"input">, "value">;
export const AmountInput = ({
  market,
  onCommit,
  initialValue,
  error = false,
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
    <div className="flex">
      {market && <p className="pr-4">{market}</p>}
      <Input
        {...props}
        className={`w-auto ${error ? "error" : ""}`}
        type="text"
        value={!isFocused ? initialValue : internalValue}
        onFocus={() => setIsFocused(true)}
        onChange={(e) => setInternalValue(e.target.value)}
        onBlur={() => {
          setIsFocused(false);
          onCommit(internalValue);
        }}
        style={error ? { border: "1px solid red" } : {}}
      />
    </div>
  );
};
