export const roundTo = (value: number, to: number): number => {
  const remainder = value % to;
  if (value < 0) {
    return Math.abs(remainder) > to / 2 ? value - remainder - to : value - remainder;
  } else {
    return remainder > to / 2 ? value - remainder + to : value - remainder;
  }
};
