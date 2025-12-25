import { useMarkets } from "../state/hooks";

export const Markets = () => {
  const markets = useMarkets();

  return (
    <div>
      {markets?.map((market) => (
        <div key={market.name}>{market.name}</div>
      ))}
    </div>
  );
};
