import { FieldLabel, FieldSet } from "@/components/ui/field";
import { PropsWithChildren } from "react";

export const FieldWrapper = ({
  children,
  label,
}: PropsWithChildren<{ label: string }>) => (
  <FieldSet className="flex flex-row align-center">
    <FieldLabel>
      {label}
      {children}
    </FieldLabel>
  </FieldSet>
);
