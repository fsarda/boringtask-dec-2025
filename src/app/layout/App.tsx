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
        <div className="flex gap-4 flex-col ">
          <div className="flex gap-8 p-1 bg-background text-foreground flex-row justify-end bg-secondary">
            <ModeToggle />
          </div>
          <div className="flex gap-4 flex-col-reverse w-screen h-screen text-foreground sm:flex-row ">
            <Section className="basis-full">
              <OrdersBook />
            </Section>
            <Section className="basis-sm">
              <OrderForm />
            </Section>
          </div>
        </div>
      </QueryProvider>
    </ThemeProvider>
  );
}

export default App;
