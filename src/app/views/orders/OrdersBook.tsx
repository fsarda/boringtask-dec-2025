import { Suspense } from "react";
import { useOrders } from "../../../api-client/orders";

const OrdersBookInternal = () => {
  const { data: orders } = useOrders();

  return orders.map((order) => (
    <div key={order.id}>{JSON.stringify(order)}</div>
  ));
};

export const OrdersBook = () => (
  <Suspense fallback={"Loading orders..."}>
    <OrdersBookInternal />
  </Suspense>
);
