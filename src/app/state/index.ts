import { useContext } from "react";
import { OrdersContext, OrdersCreationContext } from "./context";
import { OrderState } from "./ordersState";
import { OrderFormState } from "./orderCreationState";

export const useOrderStateForm = (): OrderFormState => {
  const selector = useContext(OrdersContext);

  const form = selector((state) => {
    return state.form;
  });

  return form;
};

export const useOrders = (): OrderState["orders"] => {
  const selector = useContext(OrdersContext);
  const orders = selector((state) => {
    return state.orders;
  });
  const market = selector((state) => {
    return state.form.market;
  });

  return market && orders[market.name] ? orders[market.name].orders : [];
};

export const useMarketSpread = (): OrderState["spread"] => {
  const selector = useContext(OrdersContext);
  const orders = selector((state) => {
    return state.orders;
  });
  const { market } = selector((state) => {
    return state.form;
  });

  return market && orders[market.name]
    ? orders[market.name].spread
    : { lowestSellPrice: 0, higherBuyPrice: 0 };
};

export const useDispatchAction = () => useContext(OrdersCreationContext);
