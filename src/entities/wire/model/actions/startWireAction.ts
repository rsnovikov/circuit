import { nanoid } from 'nanoid';
import { AppDispatch } from '@/app/appStore';
import { ICirWire, setDrawingWire } from '@/entities/wire';

export const startWireAction =
  ({ startNodeId, x1, y1 }: { startNodeId: string; x1: number; y1: number }) =>
  (dispatch: AppDispatch) => {
    const wire: ICirWire = {
      id: nanoid(),
      x1,
      y1,
      x2: x1,
      y2: y1,
      startNodeId,
      endNodeId: null,
      color: 'green',
    };
    dispatch(setDrawingWire(wire));
  };
