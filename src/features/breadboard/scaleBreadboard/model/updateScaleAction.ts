import { AppDispatch, RootState } from '@/app/appStore';
import { setScale, setTranslateCoords } from '@/entities/circuit/model/slice';
import { ICoords } from '@/shared/model/types';

export const updateScaleAction =
  (scaleStep: number, originPoint: ICoords) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      scale,
      translateCoords: { translateX, translateY },
    } = getState().circuit;
    const nextScale = scale + scaleStep;
    if (scale + scaleStep < 0.2 || scale + scaleStep > 5) return;

    const scaleDivision = nextScale / scale;

    const updatedTranslateX = scaleDivision * (translateX - originPoint.x) + originPoint.x;
    const updatedTranslateY = scaleDivision * (translateY - originPoint.y) + originPoint.y;

    dispatch(
      setTranslateCoords({
        translateX: updatedTranslateX,
        translateY: updatedTranslateY,
      })
    );
    dispatch(setScale(nextScale));
  };
