import { PropsWithChildren } from "react";
import { TypographyH2 } from "@/components/typography-h2";

export type SectionProps = PropsWithChildren<{ title: string }>;
export const Section = ({ title, children }: SectionProps) => (
  <div className="flex flex-col w-full gap-8 h-full p-2 rounded-3xl bg-secondary">
    <TypographyH2 className="bg-primary text-primary-foreground rounded-2xl">
      {title}
    </TypographyH2>
    <div className="h-full w-full">{children}</div>
  </div>
);
