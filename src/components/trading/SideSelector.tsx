import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Select } from "@/components/ui/select";
import { Side } from "@/types/orders";
import { FieldWrapper } from "./FieldWrapper";

export const SideSelector = ({
  value,
  onValueChange,
  ...props
}: React.ComponentProps<typeof Select>) => {
  const isBuy = value === Side.BUY;
  return (
    <FieldWrapper label="Side">
      <ButtonGroup className="w-full">
        <Button
          type="button"
          variant={"outline"}
          style={{ backgroundColor: isBuy ? "var(--buy)" : "" }}
          onClick={() => {
            onValueChange?.(Side.BUY);
          }}
          {...props}
        >
          {Side.BUY}
        </Button>
        <Button
          type="button"
          variant={"outline"}
          style={{ backgroundColor: !isBuy ? "var(--sell)" : "" }}
          onClick={() => {
            onValueChange?.(Side.SELL);
          }}
          {...props}
        >
          {Side.SELL}
        </Button>
      </ButtonGroup>
    </FieldWrapper>
  );
};
