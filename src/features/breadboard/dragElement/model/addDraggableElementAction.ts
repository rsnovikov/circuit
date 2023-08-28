import { AppDispatch, RootState } from '@/app/appStore';
import { setDraggableElement } from '@/entities/cirElement/model/slice';
import { transformCoords } from '@/shared/lib/transformCoords';

export const addDraggableElementAction =
  ({ elementId, clientX, clientY }: { elementId: string; clientX: number; clientY: number }) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      cirElement: { elements },
      circuit: { scale },
    } = getState();

    const cirElement = elements.find((element) => element.id === elementId);
    if (!cirElement) return;
    const { x, y } = cirElement;
    const { x: transformedInitialX, y: transformedInitialY } = transformCoords({
      x: clientX,
      y: clientY,
      scale,
    });
    const offsetX = transformedInitialX - x;
    const offsetY = transformedInitialY - y;
    dispatch(
      setDraggableElement({
        elementId,
        initialX: x,
        initialY: y,
        offsetX,
        offsetY,
      })
    );
  };
