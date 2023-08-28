import { AppDispatch, RootState } from '@/app/appStore';
import { setDraggableElement, updateElementById } from '@/entities/cirElement/model/slice';
import { updateWiresCoordsByCirElementAction } from '@/entities/wire/model/actions/updateWiresCoordsByCirElementAction';
import { roundTo } from '@/shared/lib/roundTo';

// TODO: join confirmDraggableElement and updateDraggableElement
export const confirmDraggableElementAction =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      cirElement: { draggableElement, elements },
      circuit: { gridStep },
    } = getState();
    if (!draggableElement) return;
    const cirElement = elements.find((element) => element.id === draggableElement.elementId);
    if (!cirElement) return;

    const updatedCirElement = {
      ...cirElement,
      x: roundTo(cirElement.x, gridStep),
      y: roundTo(cirElement.y, gridStep),
    };

    dispatch(updateWiresCoordsByCirElementAction(updatedCirElement));

    dispatch(
      updateElementById({
        id: updatedCirElement.id,
        updatedElement: updatedCirElement,
      })
    );
    dispatch(setDraggableElement(null));
  };
