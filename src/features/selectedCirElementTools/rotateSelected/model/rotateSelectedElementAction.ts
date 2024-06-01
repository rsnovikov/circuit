import { AppDispatch, RootState } from '@/app/appStore';
import { updateElementById } from '@/entities/cirElement/model/slice';
import { ICirElement } from '@/entities/cirElement/model/types';
import { updateWiresCoordsByCirElementAction } from '@/entities/wire/model/actions/updateWiresCoordsByCirElementAction';

export const rotateSelectedElementAction =
  (angle: number) => (dispatch: AppDispatch, getState: () => RootState) => {
    const { elements, selectedElementId } = getState().cirElement;
    if (!selectedElementId) return;
    const element = elements.find((element) => element.id === selectedElementId);
    if (!element) return;

    const updatedElement: ICirElement = {
      ...element,
      rotate: element.rotate + angle,
    };

    dispatch(updateWiresCoordsByCirElementAction(updatedElement));

    dispatch(updateElementById({ id: element.id, updatedElement }));
  };
