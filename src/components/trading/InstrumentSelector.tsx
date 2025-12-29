import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
type InstrumentSelectorProps = {
  onMarketChange: (market: string) => void;
  collateralName: string;
  syntheticName: string;
  currentName: string;
} & React.ComponentProps<typeof Button>;

export const InstrumentSelector = ({
  onMarketChange,
  collateralName,
  syntheticName,
  currentName,
  ...rest
}: InstrumentSelectorProps) => {
  const isCollateralSelected = currentName === collateralName;
  return (
    <ButtonGroup>
      <Button
        variant={isCollateralSelected ? "outline" : "default"}
        onClick={() => {
          onMarketChange(syntheticName);
        }}
        {...rest}
        type="button"
      >
        {syntheticName}
      </Button>
      <Button
        variant={!isCollateralSelected ? "outline" : "default"}
        onClick={() => {
          onMarketChange(collateralName);
        }}
        {...rest}
        type="button"
      >
        {collateralName}
      </Button>
    </ButtonGroup>
  );
};
