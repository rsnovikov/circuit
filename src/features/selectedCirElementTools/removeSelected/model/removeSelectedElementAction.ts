import { AppDispatch, RootState } from '@/app/appStore';
import { removeElementById, setSelectedElementId } from '@/entities/cirElement/model/slice';
import { ICirNode, removeNodeById, updateNodeById } from '@/entities/node';
import { removeWireById } from '@/entities/wire';

export const removeSelectedElementAction =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      cirElement: { selectedElementId, elements },
      node: { nodes },
      wire: { wires },
    } = getState();

    if (!selectedElementId) return;
    const selectedElement = elements.find((element) => element.id === selectedElementId);
    if (!selectedElement) return;

    const elementNodes = nodes.filter(
      (node) => node.relatedElement?.elementId === selectedElement.id
    );

    const elementWires = wires.filter((wire) =>
      elementNodes.some((node) => wire.endNodeId === node.id || wire.startNodeId === node.id)
    );

    elementNodes.forEach((node) => dispatch(removeNodeById(node.id)));
    elementWires.forEach((wire) => dispatch(removeWireById(wire.id)));

    elementNodes.forEach((deletedNode) => {
      nodes.forEach((node) => {
        if (node.connectionIds.includes(deletedNode.id)) {
          const updatedConnectionIds = node.connectionIds.filter(
            (connectionId) => connectionId !== deletedNode.id
          );
          const updatedNode: ICirNode = { ...node, connectionIds: updatedConnectionIds };
          dispatch(updateNodeById({ id: updatedNode.id, updatedNode }));
        }
      });
    })



    dispatch(removeElementById(selectedElementId));
    dispatch(setSelectedElementId(null));
  };
