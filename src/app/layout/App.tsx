import { OrderForm, OrdersBook } from "../views/orders";
import { QueryProvider } from "./providers";

/**
 * YOUR CODE IS HERE
 */
function App() {
  return (
    <QueryProvider>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <OrderForm />
        <OrdersBook />
      </div>
    </QueryProvider>
  );
}

export default App;
