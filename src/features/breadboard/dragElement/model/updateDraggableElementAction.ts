import { AppDispatch, RootState } from '@/app/appStore';
import { updateElementById } from '@/entities/cirElement/model/slice';
import { updateWiresCoordsByCirElementAction } from '@/entities/wire/model/actions/updateWiresCoordsByCirElementAction';
import { transformCoords } from '@/shared/lib/transformCoords';
import { ICoords } from '@/shared/model/types';

// todo: maybe don't update elements every time, but update draggableElement and render in widget Breadboard
export const updateDraggableElementAction =
  ({ x, y }: ICoords) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      cirElement: { draggableElement, elements },
      circuit: { scale },
    } = getState();

    if (!draggableElement) return;
    const cirElement = elements.find((element) => element.id === draggableElement.elementId);
    if (!cirElement) return;
    const { offsetX, offsetY } = draggableElement;
    const { x: transformedX, y: transformedY } = transformCoords({ x, y, scale });

    const updatedCirElement = {
      ...cirElement,
      x: transformedX - offsetX,
      y: transformedY - offsetY,
    };

    dispatch(updateWiresCoordsByCirElementAction(updatedCirElement));

    dispatch(
      updateElementById({
        id: updatedCirElement.id,
        updatedElement: updatedCirElement,
      })
    );
  };
