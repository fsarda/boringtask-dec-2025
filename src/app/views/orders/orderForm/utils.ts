export const isValidPositiveNumber = (value: string) => {
  const valueNumber = parseFloat(value);
  return !isNaN(valueNumber) && valueNumber > 0;
};

export const fromCollateralToSynthetic = (amount: number, price: number) => {
  if (price === 0) return NaN;
  return amount / price;
};

export const fromSyntheticToCollateral = (amount: number, price: number) => {
  return amount * price;
};

export const formatter = (amount: number, precision: number = 2) => {
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(amount);
};
