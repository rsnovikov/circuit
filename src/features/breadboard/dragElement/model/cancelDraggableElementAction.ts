import { AppDispatch, RootState } from '@/app/appStore';
import { setDraggableElement, updateElementById } from '@/entities/cirElement/model/slice';
import { updateWiresCoordsByCirElementAction } from '@/entities/wire/model/actions/updateWiresCoordsByCirElementAction';

export const cancelDraggableElementAction =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const { draggableElement, elements } = getState().cirElement;
    if (!draggableElement) return;
    const { initialX, initialY } = draggableElement;
    const cirElement = elements.find((element) => element.id === draggableElement.elementId);
    if (!cirElement) return;
    const updatedElement = { ...cirElement, x: initialX, y: initialY };
    dispatch(
      updateElementById({
        id: cirElement.id,
        updatedElement,
      })
    );
    dispatch(updateWiresCoordsByCirElementAction(updatedElement));
    dispatch(setDraggableElement(null));
  };
