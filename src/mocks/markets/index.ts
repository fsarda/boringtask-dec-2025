import { http, type RequestHandler } from "msw";
import {
  BAD_REQUEST_RESPONSE,
  NOT_FOUND_RESPONSE,
  SUCCESS_RESPONSE,
} from "../common";
import { getStatsForMarket, getMarkets } from "./data";
import { MarketStatRequest, MarketStatResponseCode } from "../../types/markets";

const getMarketsHandler = http.get("/api/v1/markets", () => {
  return SUCCESS_RESPONSE(getMarkets());
});

const getMarketStatsHandler = http.get<MarketStatRequest>(
  "/api/v1/markets/:market/stats",
  ({ params }) => {
    const { market } = params;

    const { type, payload } = getStatsForMarket({ market });

    if (type === MarketStatResponseCode.SUCCESS) {
      return SUCCESS_RESPONSE(payload);
    } else if (type === MarketStatResponseCode.INVALID_PARAMS) {
      return NOT_FOUND_RESPONSE;
    } else {
      return BAD_REQUEST_RESPONSE;
    }
  }
);

export const MARKET_API_HANDLER: RequestHandler[] = [
  getMarketsHandler,
  getMarketStatsHandler,
];
