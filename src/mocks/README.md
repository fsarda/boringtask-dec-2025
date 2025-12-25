# API docs

## Orders

- `GET /api/v1/orders`: List all orders available in the repository
  - Response:

  ```json
  [
    {
      "id": "some-id",
      "market": "EUR-BTC",
      "side": "buy",
      "price": 0.111,
      "qty": 10,
      "hash": "fffff"
    }
  ]
  ```

- `POST /api/v1/orders`: List all orders available in the repository
  - Request

  ```json
  {
    "market": "EUR-BTC",
    "side": "buy",
    "price": 0.111,
    "qty": 10,
    "hash": "fffff"
  }
  ```

  - Response: 200

  ```json
  {
    "id": "some-id",
    "market": "EUR-BTC",
    "side": "buy",
    "price": 0.111,
    "qty": 10,
    "hash": "fffff"
  }
  ```

  - Response: 404 if market not found
  - Response: 400 if invalid values

## Market

- `GET /api/v1/markets`: List all the markets
  - Response:

  ```json
  [
    "BTC-USD": {
    "name": "BTC-USD",
    "syntheticName": "BTC",
    "syntheticPrecision": 5,
    "collateralName": "USD",
    "collateralPrecision": 1,
  },
  "ETH-USD": {
    "name": "ETH-USD",
    "syntheticName": "ETH",
    "syntheticPrecision": 4,
    "collateralName": "USD",
    "collateralPrecision": 2,
  },
  ]
  ```

- `GET /api/v1/markets/:market/stats`: Get current stats for a given market
  - Params:
    `:market`: string

  - Response: 200

  ```json
  {
    "market": "EUR-BTC",
    "price": 0.111
  }
  ```

  - Response: 404 if market not found
  - Response: 400 if invalid values
