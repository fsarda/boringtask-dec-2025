import { useState } from "react";
import { useMarkets, useMarketStats } from "../state/hooks";

export const Markets = () => {
  const [market, setMarket] = useState<string>("");
  return (
    <div>
      <MarketSelector onChange={setMarket} selectedMarket={market} />
      <MarketPrice selectedMarket={market} />
    </div>
  );
};

const MarketSelector = ({
  selectedMarket,
  onChange,
}: {
  selectedMarket: string;
  onChange: (value: string) => void;
}) => {
  const markets = useMarkets();

  return (
    <select
      value={selectedMarket}
      onChange={(event) => onChange(event.target.value)}
    >
      {markets?.map(({ name }) => (
        <option key={name} id={name}>
          {name}
        </option>
      ))}
    </select>
  );
};

const MarketPrice = ({ selectedMarket }: { selectedMarket: string }) => {
  const stat = useMarketStats(selectedMarket);

  return <div key={selectedMarket}>{JSON.stringify(stat)}</div>;
};
