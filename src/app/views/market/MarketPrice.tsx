import { Suspense } from "react";
import { useMarketStats } from "../../../api-client/markets";

const MarketPriceInternal = ({
  selectedMarket,
}: {
  selectedMarket: string;
}) => {
  const stat = useMarketStats(selectedMarket);

  return <div key={selectedMarket}>{stat.data.price}</div>;
};

export const MarketPrice = ({ selectedMarket }: { selectedMarket: string }) => {
  return selectedMarket.trim().length > 0 ? (
    <Suspense fallback={"Loading price..."}>
      <MarketPriceInternal selectedMarket={selectedMarket} />;
    </Suspense>
  ) : null;
};
