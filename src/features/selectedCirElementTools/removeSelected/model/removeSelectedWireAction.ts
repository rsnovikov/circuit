import { AppDispatch, RootState } from '@/app/appStore';
import { ICirNode, updateNodeById } from '@/entities/node';
import { removeWireById } from '@/entities/wire';
import { setSelectedWireId } from '@/entities/wire/model/slice';

export const removeSelectedWireAction =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      wire: { selectedWireId, wires },
      node: { nodes },
    } = getState();
    const selectedWire = wires.find((wire) => wire.id === selectedWireId);
    if (!selectedWire) return;
    const startNode = nodes.find((node) => node.id === selectedWire.startNodeId);
    const endNode = nodes.find((node) => node.id === selectedWire.endNodeId);
    if (!startNode || !endNode) return;

    const updatedStartNode: ICirNode = {
      ...startNode,
      connectionIds: startNode.connectionIds.filter((connectionId) => {
        return connectionId !== endNode.id;
      }),
    };
    const updatedEndNode: ICirNode = {
      ...endNode,
      connectionIds: endNode.connectionIds.filter((connectionId) => connectionId !== startNode.id),
    };
    dispatch(updateNodeById({ id: updatedStartNode.id, updatedNode: updatedStartNode }));
    dispatch(updateNodeById({ id: updatedEndNode.id, updatedNode: updatedEndNode }));
    dispatch(removeWireById(selectedWire.id));
    dispatch(setSelectedWireId(null));
  };
