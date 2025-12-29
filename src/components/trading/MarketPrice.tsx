import { useMarketStats } from "@/api-client/markets";
import { TypographyP } from "@/components/typography-p";
import { cn } from "@/lib/utils";
import { Market } from "@/types/markets";
import { Suspense, useEffect, useState } from "react";
import { FieldWrapper } from "./FieldWrapper";
import { formatter } from "./utils";

export type MarketPriceProps = {
  market: Market;
  onPriceChange: (price: number) => void;
};

type PriceMovement = {
  price: string;
  direction: "up" | "down" | "neutral";
};

const MarketPriceInternal = ({ market, onPriceChange }: MarketPriceProps) => {
  const { data } = useMarketStats(market.name);
  const [internalPrice, setInternalPrice] = useState<PriceMovement>({
    price: formatter(data.price, 5),
    direction: "neutral",
  });

  useEffect(() => {
    setInternalPrice((prev) => ({
      price: formatter(data.price, 5),
      direction: parseFloat(prev.price) > data.price ? "up" : "down",
    }));
    onPriceChange(data.price);
  }, [data.price]);

  return (
    <FieldWrapper label="Price">
      <TypographyP
        className={cn(
          "p-0",
          "font-semibold",
          { up: internalPrice.direction === "up" },
          { down: internalPrice.direction === "down" }
        )}
      >{`${internalPrice.price} ${market.collateralName}`}</TypographyP>
    </FieldWrapper>
  );
};

export const MarketPrice = (props: MarketPriceProps) => (
  <Suspense fallback={"Loading price..."}>
    <MarketPriceInternal {...props} />
  </Suspense>
);
