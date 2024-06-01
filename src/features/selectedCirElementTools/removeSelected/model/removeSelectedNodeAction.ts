import { AppDispatch, RootState } from '@/app/appStore';
import { ICirNode, removeNodeById, updateNodeById } from '@/entities/node';
import { setSelectedNodeId } from '@/entities/node/model/slice';
import { removeWireById } from '@/entities/wire';

export const removeSelectedNodeAction =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      node: { selectedNodeId, nodes },
      wire: { wires },
    } = getState();
    const selectedNode = nodes.find((node) => node.id === selectedNodeId);
    if (!selectedNode) return;
    nodes.forEach((node) => {
      if (node.connectionIds.includes(selectedNode.id)) {
        const updatedConnectionIds = node.connectionIds.filter(
          (connectionId) => connectionId !== selectedNode.id
        );
        const updatedNode: ICirNode = { ...node, connectionIds: updatedConnectionIds };
        dispatch(updateNodeById({ id: updatedNode.id, updatedNode }));
      }
    });
    wires.forEach((wire) => {
      if (wire.startNodeId === selectedNode.id || wire.endNodeId === selectedNode.id) {
        dispatch(removeWireById(wire.id));
      }
    });
    dispatch(removeNodeById(selectedNode.id));
    dispatch(setSelectedNodeId(null));
  };
