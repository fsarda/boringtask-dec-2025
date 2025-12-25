import { sendOrderCreateRequest } from "../state/actions";

export const OrderForm = () => {
  return (
    <button
      onClick={() =>
        sendOrderCreateRequest({
          hash: "xxxxx",
          price: 123,
          side: "buy",
          qty: 10,
          market: "BTC-EUR",
        })
      }
    >
      Send order
    </button>
  );
};
