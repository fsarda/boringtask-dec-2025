import { PropsWithChildren } from "react";

export const TypographyH2: React.FC<
  PropsWithChildren<{ className?: string }>
> = ({ children, className, ...rest }) => {
  return (
    <h2
      className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 p-2 ${className}`}
      {...rest}
    >
      {children}
    </h2>
  );
};
