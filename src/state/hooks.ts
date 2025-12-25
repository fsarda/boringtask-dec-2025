import { useEffect, useState } from "react";

export const useMarkets = () => {
  const [markets, setMarkets] = useState<{ name: string }[]>();
  useEffect(() => {
    fetch("/api/v1/markets")
      .then((response) => response.json())
      .then((data) => setMarkets(data));
  }, []);

  return markets;
};

export const useMarketStats = (market: string) => {
  const [stat, setStat] = useState<number>();

  useEffect(() => {
    if (market.trim().length > 0) {
      const interval = setInterval(() => {
        fetch(`/api/v1/markets/${market}/stats`)
          .then((response) => response.json())
          .then((data) => setStat(data));
      }, 3000);

      () => {
        console.log("clearing interval", interval);
        clearInterval(interval);
      };
    }
  }, [market]);

  return stat;
};
