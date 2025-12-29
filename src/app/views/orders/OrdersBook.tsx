import { useOrders } from "@/app/state";
import { Suspense } from "react";

const OrdersBookInternal = () => {
  const orders = useOrders();

  return orders.map((order) => (
    <div key={order.id} className="w-100">
      {JSON.stringify(order)}
    </div>
  ));
};

export const OrdersBook = () => (
  <Suspense fallback={"Loading orders..."}>
    <OrdersBookInternal />
  </Suspense>
);
