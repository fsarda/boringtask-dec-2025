import { useMarket, useMarketSpread } from "@/app/state";
import { TypographyP } from "@/components/typography-p";

export const Spread = () => {
  const market = useMarket();
  const spread = useMarketSpread();

  return (
    market && (
      <TypographyP className="p-4">
        Spread for {market.name} is{" "}
        {spread.lowestSellPrice - spread.higherBuyPrice}
      </TypographyP>
    )
  );
};
