export const ceilTo = (value: number, to: number): number => {
  return value + (value % to);
};
