import { AppDispatch, RootState } from '@/app/appStore';
import { setSelectedElementId } from '@/entities/cirElement/model/slice';
import { removeSelectedEntities } from '@/shared/model/actions';

export const addSelectedElementIdACtion =
  (id: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const { drawingWire } = getState().wire;
    if (drawingWire) return;
    dispatch(removeSelectedEntities());
    dispatch(setSelectedElementId(id));
  };
