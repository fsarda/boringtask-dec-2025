# Boring home task

## Description

You will need to implement a simple cryptocurrency exchange order form widget.

Form should have:
- market selector (`BTC-USD` and `ETH-USD`);
- current market price label (should be updated every N seconds);
- two inputs (`collateral amount` and `synthetic amount`);
- and a submit buttons (`BUY` and `SELL`).

User can input order amount using either collateral (e.g. USD) or synthetic (e.g. BTC) field,
and the other field should be calculated automatically based on the current market price:
- If collateral is used -> synthetic should be calculated as `synthetic = collateral / price`
- If synthetic is used -> collateral should be calculated as `collateral = synthetic * price`

When the form is submitted, a new order object should be created and sent to the exchange.
Order object should have a `hash` field (value should be unique to any specific set
of order parameters).

Data (see `API` section for more details):
- Available markets are returned by the API endpoint `GET /api/v1/markets`.
- Current market stats `price` is returned by the API endpoint `GET /api/v1/markets/:market/stats`.
- Order should be submitted to the API endpoint `POST /api/v1/orders`.

UI schema:
```
┌---------------------┐
| Market:   BTC-USD ⌄ |
|---------------------|
| Last Price:   42296 |
|---------------------|
| BTC           0.001 |
|---------------------|
| USD           42.30 |
|---------------------|
| [BUY]        [SELL] |
└---------------------┘
```

## Acceptance criteria

> You should provide your solution as a `Pull Request` to this repository.
> Expected time to complete: 2-3 hours (please do not spend more than that).
> After that we will schedule a call to discuss your solution and possible improvements (if any).

- **Using `React` is mandatory**.
- **Using `TypeScript` is mandatory**.
- This template is using `Vite`, but you're free to use any other framework or tooling.
- You can use any UI-kit (using native HTML elements is totally fine)/state management/networking/etc. library.
- You should prefer to have better UX over better UI.
- Amount inputs should be formatted according to the market assets precision.
- `Market selector` state and the last `synthetic amount` used should be persisted between page reloads.
- You should use mock data for the API with some randomization for a market price
  (no need to add any BE here, `Mock Service Worker` library or even a simple `Promise` with a const data should be just fine).
- You should ensure that your implementation is correct by providing basic tests.

**Please raise any questions/concerns you have in the `Pull Request`.**

## API

### `GET /api/v1/markets`

Response example:
```json5
// HTTP 200
[
    {
        "name": "BTC-USD",
        "syntheticName": "BTC",
        "syntheticPrecision": 5,
        "collateralName": "USD",
        "collateralPrecision": 1,
    },
    {
        "name": "ETH-USD",
        "syntheticName": "ETH",
        "syntheticPrecision": 4,
        "collateralName": "USD",
        "collateralPrecision": 2,
    }
]
```

### `GET /api/v1/markets/:market/stats`

Response example:
```json5
// HTTP 200
{
    "market": "BTC-USD",
    "lastPrice": "42296.6",
}
```

### `POST /api/v1/orders`

Request example:
```json5
{
    "market": "BTC-USD",
    "side": "BUY",
    "price": "42296.6",
    "qty": "0.001",
    "hash": "0x1234567890abcdef",
}
```

Response example:
```json5
// HTTP 201
{
    "id": "1",
    "hash": "0x1234567890abcdef",
}
```
