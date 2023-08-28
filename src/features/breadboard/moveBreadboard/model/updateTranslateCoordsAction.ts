import { AppDispatch, RootState } from '@/app/appStore';
import { setTranslateCoords } from '@/entities/circuit/model/slice';

export const updateTranslateCoordsAction =
  ({ deltaX, deltaY }: { deltaX: number; deltaY: number }) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      translateCoords: { translateX, translateY },
    } = getState().circuit;
    dispatch(
      setTranslateCoords({ translateX: translateX + deltaX, translateY: translateY + deltaY })
    );
  };
