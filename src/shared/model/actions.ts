import { AppDispatch } from '@/app/appStore';
import { removeSelectedElementId } from '@/entities/breadboard';
import { removeSelectedNodeId } from '@/entities/node';
import { removeSelectedWireId } from '@/entities/wire';

export const removeSelectedEntities = () => (dispatch: AppDispatch) => {
  dispatch(removeSelectedElementId());
  dispatch(removeSelectedNodeId());
  dispatch(removeSelectedWireId());
};
