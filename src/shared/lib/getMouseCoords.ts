import { ICoords } from '@/shared/model/types';

export const getMousePosition = (
  { x, y }: ICoords,
  CTM: DOMMatrix | null | undefined
): ICoords | undefined => {
  if (!CTM) return;
  return {
    x: (x - CTM.e) / CTM.a,
    y: (y - CTM.f) / CTM.d,
  };
};
