import { ModeToggle } from "@/components/theme/theme-toggle";

export const Header = () => (
  <div className="flex gap-8 p-1 bg-background text-foreground flex-row justify-end bg-secondary">
    <ModeToggle />
  </div>
);
