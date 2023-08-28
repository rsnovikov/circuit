import { AppDispatch } from '@/app/appStore';
import { setSelectedElementId } from '@/entities/cirElement/model/slice';
import { setSelectedNodeId } from '@/entities/node/model/slice';
import { setSelectedWireId } from '@/entities/wire/model/slice';

export const removeSelectedEntities = () => (dispatch: AppDispatch) => {
  dispatch(setSelectedNodeId(null));
  dispatch(setSelectedWireId(null));
  dispatch(setSelectedElementId(null));
};
