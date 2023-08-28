import { AppDispatch, RootState } from '@/app/appStore';
import { ICirNode, updateNodeById } from '@/entities/node';
import { ICirWire, addWire, setDrawingWire } from '@/entities/wire';
import { getWirePosByElement } from '@/entities/wire/lib/getWirePosByElement';

export const endWireToElementAction =
  ({ elementId, terminalId }: { elementId: string; terminalId: string }) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      cirElement: { elements },
      node: { nodes },
      wire: { drawingWire },
    } = getState();
    if (!drawingWire) return;

    const endNode = nodes.find(
      (node) =>
        node.relatedElement?.elementId === elementId &&
        node.relatedElement?.terminalId === terminalId
    );
    const startNode = nodes.find((node) => node.id === drawingWire?.startNodeId);
    const element = elements.find((element) => element.id === elementId);

    if (!endNode || !element || !startNode) return;

    const updatedStartNode: ICirNode = {
      ...startNode,
      connectionIds: [...startNode.connectionIds, endNode.id],
    };
    dispatch(updateNodeById({ id: updatedStartNode.id, updatedNode: updatedStartNode }));

    const updatedEndNode: ICirNode = {
      ...endNode,
      connectionIds: [...endNode.connectionIds, startNode.id],
    };
    dispatch(updateNodeById({ id: updatedEndNode.id, updatedNode: updatedEndNode }));

    const { x, y } = getWirePosByElement({ element, node: endNode });

    const newWire: ICirWire = {
      ...drawingWire,
      endNodeId: endNode.id,
      x2: x,
      y2: y,
    };
    dispatch(addWire(newWire));

    dispatch(setDrawingWire(null));
  };
