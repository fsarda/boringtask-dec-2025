import { PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => (
  <div className="flex gap-4 flex-col">{children}</div>
);
