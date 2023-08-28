import { AppDispatch, RootState } from '@/app/appStore';
import { setPickedElement } from '@/entities/cirElement/model/slice';
import { ICirElement } from '@/entities/cirElement/model/types';
import { transformCoords } from '@/shared/lib/transformCoords';
import { ICoords } from '@/shared/model/types';

export const updatePickedElementCoordsAction =
  ({ x, y }: ICoords) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      cirElement: { pickedElement },
      circuit: { scale, translateCoords },
    } = getState();
    if (!pickedElement) return;
    const updatedPickedElement: ICirElement = {
      ...pickedElement,
      ...transformCoords({ x, y, scale, translateCoords }),
    };
    dispatch(setPickedElement(updatedPickedElement));
  };
