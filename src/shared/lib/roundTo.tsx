export const roundTo = (value: number, to: number): number => {
  const remainder = value % to;
  return remainder > to / 2 ? value - remainder + to : value - remainder;
};
