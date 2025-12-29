import { Section } from "@/components/ui/section";
import { OrderForm, OrdersBook } from "@/app/views/orders";
import { QueryProvider } from "./providers";
import { ThemeProvider } from "@/components/theme/theme";
import { ModeToggle } from "@/components/theme/theme-toggle";

/**
 * YOUR CODE IS HERE
 */
function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryProvider>
        <div className="flex gap-8 rounded-3xl flex-col-reverse m-2 p-4 bg-background text-foreground sm:flex-row bg-secondary">
          <ModeToggle />
        </div>
        <div className="flex gap-8 rounded-2xl flex-col-reverse w-screen h-screen p-4 bg-background text-foreground sm:flex-row ">
          <Section title="Orders Book">
            <OrdersBook />
          </Section>
          <Section title="Trading ticket">
            <OrderForm />
          </Section>
        </div>
      </QueryProvider>
    </ThemeProvider>
  );
}

export default App;
