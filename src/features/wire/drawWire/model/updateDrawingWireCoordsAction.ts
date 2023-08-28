import { AppDispatch, RootState } from '@/app/appStore';
import { ICirWire, setDrawingWire } from '@/entities/wire';
import { transformCoords } from '@/shared/lib/transformCoords';
import { ICoords } from '@/shared/model/types';

export const updateDrawingWireCoordsAction =
  ({ x, y }: ICoords) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      circuit: { scale, translateCoords },
      wire: { drawingWire },
    } = getState();
    if (!drawingWire) return;
    const { x: x2, y: y2 } = transformCoords({ x, y, scale, translateCoords });

    const updatedDrawingWire: ICirWire = {
      ...drawingWire,
      x2,
      y2,
    };
    dispatch(setDrawingWire(updatedDrawingWire));
  };
