import { useMutation } from "@tanstack/react-query";
import { APIError } from "./errors";
import { hashObject } from "./hash";
import { useDispatchAction } from "@/app/state";
import { CreateOrderRequest } from "@/types/orders";

export const useCreateOrderRequest = () => {
  const dispatch = useDispatchAction();
  return useMutation({
    mutationFn: (body: CreateOrderRequest) => {
      return hashObject(body).then((hash) => {
        fetch("/api/v1/orders", {
          method: "post",
          body: JSON.stringify({ ...body, hash }),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw APIError("createOrder", "Error creating the order");
            }
          })
          .then((order) => dispatch({ type: "add_new_order", payload: order }))
          .catch(() => {
            //TODO: Send to an error stream
          });
      });
    },
  });
};

// export const useOrders = () =>
//   useRequest<Order[]>({
//     url: "/api/v1/orders",
//     key: "orders",
//     longPolling: true,
//   });
