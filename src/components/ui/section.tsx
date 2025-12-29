export type SectionProps = React.ComponentProps<"div">;
export const Section = ({
  title,
  children,
  className,
  ...props
}: SectionProps) => (
  <div
    className={`flex flex-col gap-1 h-full bg-secondary ${className}`}
    {...props}
  >
    <div className="h-full w-100 p-2">{children}</div>
  </div>
);
