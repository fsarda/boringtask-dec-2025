import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Side } from "@/types/orders";

export const SideSelector = ({
  value,
  onValueChange,
  ...props
}: React.ComponentProps<typeof Select>) => {
  return (
    <Select {...props} value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select side" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={Side.BUY}>{Side.BUY}</SelectItem>
        <SelectItem value={Side.SELL}>{Side.SELL}</SelectItem>
      </SelectContent>
    </Select>
  );
};
