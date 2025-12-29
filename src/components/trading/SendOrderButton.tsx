import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Side } from "@/types/orders";
import { FieldWrapper } from "./FieldWrapper";
import { Info } from "./Info";
export type SendOrderButtonProps = {
  side: Side;
  amount: string;
  instrument: string;
  marketValid: boolean;
} & React.ComponentProps<typeof Button>;
export const SendOrderButton = ({
  side,
  amount,
  instrument,
  marketValid,
  ...rest
}: SendOrderButtonProps) => (
  <FieldWrapper label="">
    <div className="flex flex-row gap-2 ">
      <Button
        type="submit"
        className={cn(
          "w-full",
          "basis-full",
          { sell: side === Side.SELL && marketValid },
          { buy: side === Side.BUY && marketValid }
        )}
        {...rest}
      >
        {marketValid && side && amount && instrument
          ? `${side} ${amount} ${instrument}`
          : "Send Order"}
      </Button>
      {rest.disabled && (
        <Info message="Please introduce valid markets and amounts to send an order" />
      )}
    </div>
  </FieldWrapper>
);
