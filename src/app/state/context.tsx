import {
  ActionDispatch,
  createContext,
  PropsWithChildren,
  useReducer,
} from "react";
import { AppActions, appReducer, AppState, initialAppState } from "./reducer";

//TODO: these any need to go away
type GetPartialStateFunction = (state: AppState) => any;
export const OrdersContext = createContext<
  (callback: GetPartialStateFunction) => any
>(() => initialAppState);
export const OrdersCreationContext = createContext<
  ActionDispatch<[action: AppActions]>
>(() => {});

export const AppStore = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  const useSelector = (
    callback: GetPartialStateFunction
  ): Partial<AppState> => {
    return callback(state);
  };

  return (
    <OrdersContext value={useSelector}>
      <OrdersCreationContext value={dispatch}>{children}</OrdersCreationContext>
    </OrdersContext>
  );
};
