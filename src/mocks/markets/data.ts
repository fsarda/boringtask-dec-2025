import { faker } from "@faker-js/faker";
import {
  Market,
  MarketStatRequest,
  MarketStatResponse,
  MarketStatResponseCode,
} from "../../types/markets";

const marketsTable: Record<string, Market> = {
  "BTC-USD": {
    name: "BTC-USD",
    syntheticName: "BTC",
    syntheticPrecision: 5,
    collateralName: "USD",
    collateralPrecision: 1,
  },
  "ETH-USD": {
    name: "ETH-USD",
    syntheticName: "ETH",
    syntheticPrecision: 4,
    collateralName: "USD",
    collateralPrecision: 2,
  },
  "BTC-EUR": {
    name: "BTC-EUR",
    syntheticName: "ETH",
    syntheticPrecision: 4,
    collateralName: "EUR",
    collateralPrecision: 2,
  },
  "ETH-EUR": {
    name: "ETH-EUR",
    syntheticName: "ETH",
    syntheticPrecision: 4,
    collateralName: "EUR",
    collateralPrecision: 2,
  },
};

const marketStatsTable: Record<string, number> = Object.keys(
  marketsTable
).reduce(
  (acc, market) => {
    acc[market] = faker.number.float({ min: 10, max: 20, fractionDigits: 5 });
    return acc;
  },
  {} as Record<string, number>
);

//Ticks simulation, happen independently if we have "subscribers" or not
//TODO: where to clean up this?
setInterval(() => {
  const randomMarket = faker.helpers.arrayElement(Object.keys(marketsTable));
  const isUp = faker.datatype.boolean();
  const priceTick = faker.number.float({
    min: 0.05,
    max: 0.55,
    fractionDigits: 5,
  });

  marketStatsTable[randomMarket] = isUp
    ? marketStatsTable[randomMarket] + priceTick
    : marketStatsTable[randomMarket] - priceTick;
}, 500);

export const getMarkets = (): Market[] => Object.values(marketsTable);
export const getMarketsName = (): string[] =>
  getMarkets().map(({ name }) => name);
export const getStatsForMarket = ({
  market,
}: MarketStatRequest): MarketStatResponse => {
  const isParamWellFormed =
    typeof market === "string" && market.trim().length > 0;
  const isMarketValid = getMarketsName().includes(market);

  if (!isParamWellFormed) {
    return { type: MarketStatResponseCode.INVALID_PARAMS, payload: undefined };
  } else if (!isMarketValid) {
    return { type: MarketStatResponseCode.INVALID_MARKET, payload: undefined };
  } else {
    return {
      type: MarketStatResponseCode.SUCCESS,
      payload: { name: market, price: marketStatsTable[market] },
    };
  }
};

