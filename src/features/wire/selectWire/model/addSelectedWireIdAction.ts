import { AppDispatch, RootState } from '@/app/appStore';
import { setSelectedWireId } from '@/entities/wire/model/slice';
import { removeSelectedEntities } from '@/shared/model/actions';

export const addSelectedWireIdAction =
  (wireId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const { wires } = getState().wire;
    const selectedWire = wires.find((wire) => wire.id === wireId);
    if (!selectedWire) return;
    dispatch(removeSelectedEntities());
    dispatch(setSelectedWireId(selectedWire.id));
  };
