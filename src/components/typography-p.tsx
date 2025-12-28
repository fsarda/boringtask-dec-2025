import { PropsWithChildren } from "react";

export const TypographyP: React.FC<
  PropsWithChildren<{ className?: string }>
> = ({ children, className, ...rest }) => {
  return (
    <p className={`leading-7  p-2  ${className}`} {...rest}>
      {children}
    </p>
  );
};
