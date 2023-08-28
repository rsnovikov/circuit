import { AppDispatch, RootState } from '@/app/appStore';
import { ICirNode } from '@/entities/node';
import { updateWireById } from '../slice';

export const updateWiresCoordsByNodeAction =
  (node: ICirNode) => (dispatch: AppDispatch, getState: () => RootState) => {
    const { wires } = getState().wire;

    wires
      .filter((wire) => node.id === wire.startNodeId || node.id === wire.endNodeId)
      .forEach((wire) => {
        const updatedWire = { ...wire };
        if (wire.endNodeId === node.id) {
          updatedWire.x2 = node.x;
          updatedWire.y2 = node.y;
        } else {
          updatedWire.x1 = node.x;
          updatedWire.y1 = node.y;
        }
        dispatch(updateWireById({ id: updatedWire.id, updatedWire }));
      });
  };
