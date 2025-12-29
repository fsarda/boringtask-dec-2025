import {
  initialValue as formInitialState,
  OrderFormAction,
  orderFormReducer,
  OrderFormState,
} from "./orderCreationState";
import {
  OrdersBookAction,
  ordersBookReducer,
  OrdersBookState,
  initialValue as ordersInitialState,
} from "./ordersState";

export const initialAppState = {
  form: formInitialState,
  orders: ordersInitialState,
};
export type AppState = {
  form: OrderFormState;
  orders: OrdersBookState;
};

export type AppReducer = {
  form: typeof orderFormReducer;
  orders: typeof ordersBookReducer;
};

export type AppActions = OrderFormAction | OrdersBookAction;

export const appReducer = (state: AppState, action: AppActions): AppState => {
  if (action.type === "add_new_order") {
    return {
      orders: ordersBookReducer(state.orders, action),
      form: state.form,
    };
  } else {
    return {
      orders: state.orders,
      form: orderFormReducer(state.form, action),
    };
  }
};
