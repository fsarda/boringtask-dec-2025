import { Market, MarketStat } from "../types/markets";
import { useRequest } from "./patterns";

export const useMarkets = () =>
  useRequest<Market[]>({
    key: "getMarkets",
    url: "/api/v1/markets",
  });

export const useMarketStats = (market: string) =>
  useRequest<MarketStat>({
    key: `stat-${market}`,
    url: `/api/v1/markets/${market}/stats`,
    longPolling: true,
  });
