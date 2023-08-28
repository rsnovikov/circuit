import { ICoords, ITranslateCoords } from '@/shared/model/types';

interface ITransformCoordsParams extends ICoords {
  scale: number;
  translateCoords?: ITranslateCoords;
}

export const transformCoords: (params: ITransformCoordsParams) => ICoords = ({
  x,
  y,
  scale,
  translateCoords = { translateX: 0, translateY: 0 },
}) => {
  const transformedX = x / scale - translateCoords.translateX / scale;
  const transformedY = y / scale - translateCoords.translateY / scale;
  return { x: transformedX, y: transformedY };
};
