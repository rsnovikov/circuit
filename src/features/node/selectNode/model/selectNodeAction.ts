import { AppDispatch, RootState } from '@/app/appStore';
import { setSelectedNodeId } from '@/entities/node/model/slice';
import { removeSelectedEntities } from '@/shared/model/actions';

export const selectNodeAction =
  (id: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const { drawingWire } = getState().wire;
    if (drawingWire) return;
    dispatch(removeSelectedEntities());
    dispatch(setSelectedNodeId(id));
  };
