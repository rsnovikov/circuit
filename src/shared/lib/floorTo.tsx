export const floorTo = (value: number, to: number): number => {
  return value - (value % to);
};
