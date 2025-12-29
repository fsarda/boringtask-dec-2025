import { Section } from "@/components/ui/section";
import { OrdersBook, OrderForm } from "../views/orders";

export const Content = () => (
  <div className="flex gap-4 flex-col-reverse w-screen h-screen text-foreground sm:flex-row ">
    <Section className="basis-full">
      <OrdersBook />
    </Section>
    <Section className="basis-sm">
      <OrderForm />
    </Section>
  </div>
);
