import { AppDispatch, RootState } from '@/app/appStore';
import { ICirNode, updateNodeById } from '@/entities/node';
import { ICirWire, addWire, setDrawingWire } from '@/entities/wire';

// todo: join endWireToNode and endWireToElement
export const endWireToNodeAction =
  (endNodeId: string) => (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      node: { nodes },
      wire: { drawingWire },
    } = getState();
    if (!drawingWire) return;
    const startNode = nodes.find((node) => node.id === drawingWire.startNodeId);
    const endNode = nodes.find((node) => node.id === endNodeId);

    if (!startNode || !endNode) return;

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

    const newWire: ICirWire = {
      ...drawingWire,
      endNodeId: endNode.id,
      x2: endNode.x,
      y2: endNode.y,
    };
    dispatch(addWire(newWire));
    dispatch(setDrawingWire(null));
  };
