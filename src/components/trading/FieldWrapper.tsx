import { FieldSet } from "@/components/ui/field";
import { PropsWithChildren } from "react";

export const FieldWrapper = ({
  children,
  label,
}: PropsWithChildren<{ label: string }>) => (
  <FieldSet className="flex flex-col align-center gap-2">
    <label>{label}</label>
    {children}
  </FieldSet>
);
