import { Suspense, useEffect } from "react";
import { useMarketStats } from "@/api-client/markets";
import { TypographyP } from "@/components/typography-p";
import { formatter } from "../orders/orderForm/utils";

export type MarketPriceProps = {
  selectedMarket: string;
  onPriceChange: (price: number) => void;
};

const MarketPriceInternal = ({
  selectedMarket,
  onPriceChange,
}: MarketPriceProps) => {
  const { data } = useMarketStats(selectedMarket);

  useEffect(() => {
    onPriceChange(data.price);
  }, [data.price]);

  return <TypographyP>{formatter(data.price, 5)}</TypographyP>;
};

export const MarketPrice = (props: MarketPriceProps) => {
  return props.selectedMarket.trim().length > 0 ? (
    <Suspense fallback={"Loading price..."}>
      <MarketPriceInternal {...props} />
    </Suspense>
  ) : null;
};
