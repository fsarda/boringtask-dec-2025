import { Maybe } from "./common";

export type Market = {
  name: string;
  syntheticName: string;
  syntheticPrecision: number;
  collateralName: string;
  collateralPrecision: number;
};

export type MarketStatRequest = {
  market: string;
};

export enum MarketStatResponseCode {
  "SUCCESS",
  "INVALID_MARKET",
  "INVALID_PARAMS",
}
export type MarketStatResponse = {
  type: MarketStatResponseCode;
  payload: Maybe<MarketStat>;
};
export type MarketStat = {
  name: string;
  price: number;
};
