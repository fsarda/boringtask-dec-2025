import { Suspense, useCallback } from "react";
import { useMarkets } from "@/api-client/markets";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Market } from "@/types/markets";
import { Maybe } from "@/types/common";

type MarketSelectorProps = {
  selectedMarket: Maybe<Market>;
  onChange: (value: Market) => void;
} & Pick<HTMLSelectElement, "name">;

const MarketSelectorInternal = ({
  selectedMarket,
  onChange,
  ...rest
}: MarketSelectorProps) => {
  const { data: markets } = useMarkets();

  // TODO: Not good to be searching selected market in the array
  // we need to transform data to be a hash probably or even better
  // continue with combobox component to be able to store an object as
  // part of the component value
  const onChangeHandler = useCallback(
    (name: string) => {
      const market = markets.find((market) => market.name === name);
      if (!market) return;
      onChange(market);
    },
    [markets]
  );

  return (
    <Select
      {...rest}
      value={selectedMarket ? selectedMarket.name : undefined}
      onValueChange={onChangeHandler}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select market" />
      </SelectTrigger>
      <SelectContent>
        {markets?.map(({ name }) => (
          <SelectItem key={name} id={name} value={name}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};;

export const MarketSelector = ({
  selectedMarket,
  onChange,
  ...rest
}: MarketSelectorProps) => {
  return (
    <Suspense fallback={"Loading markets"}>
      <MarketSelectorInternal
        selectedMarket={selectedMarket}
        onChange={onChange}
        {...rest}
      />
    </Suspense>
  );
};
