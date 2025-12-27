import { Suspense } from "react";
import { useMarkets } from "../../../api-client/markets";

const MarketSelectorInternal = ({
  selectedMarket,
  onChange,
}: {
  selectedMarket: string;
  onChange: (value: string) => void;
}) => {
  const { data: markets } = useMarkets();

  return (
    <select
      value={selectedMarket}
      onChange={(event) => onChange(event.target.value)}
    >
      <option>Select a market</option>
      {markets?.map(({ name }) => (
        <option key={name} id={name}>
          {name}
        </option>
      ))}
    </select>
  );
};

export const MarketSelector = ({
  selectedMarket,
  onChange,
}: {
  selectedMarket: string;
  onChange: (value: string) => void;
}) => {
  return (
    <Suspense fallback={"Loading markets"}>
      <MarketSelectorInternal
        selectedMarket={selectedMarket}
        onChange={onChange}
      />
    </Suspense>
  );
};
