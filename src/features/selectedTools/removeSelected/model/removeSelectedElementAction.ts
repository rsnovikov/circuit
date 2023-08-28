import { AppDispatch, RootState } from '@/app/appStore';
import { removeElementById, setSelectedElementId } from '@/entities/cirElement/model/slice';
import { removeNodeById } from '@/entities/node';
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
    dispatch(removeElementById(selectedElementId));
    dispatch(setSelectedElementId(null));
  };
