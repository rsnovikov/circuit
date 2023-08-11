import { nanoid } from 'nanoid';
import { AppDispatch, RootState } from '@/app/appStore';
import { ICirNode, addNode, updateNodeById } from '@/entities/node';
import { ICirWire, addWire, removeWireById } from '@/entities/wire';
import { transformCoords } from '@/shared/lib/transformCoords';
import { ISplitWireParams } from './types';

export const splitWireAction =
  ({ wireId, clientX, clientY }: ISplitWireParams) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      wire: { wires },
      node: { nodes },
      breadboard: { scale, translateCoords },
    } = getState();

    const splittedWire = wires.find((wire) => wire.id === wireId);
    if (!splittedWire) return;
    const startNode = nodes.find((node) => node.id === splittedWire.startNodeId);
    const endNode = nodes.find((node) => node.id === splittedWire.endNodeId);
    if (!startNode || !endNode) return;

    const { x, y } = transformCoords({ x: clientX, y: clientY, scale, translateCoords });

    const middleNode: ICirNode = {
      id: nanoid(),
      x,
      y,
      relatedElement: null,
      connectionIds: [startNode.id, endNode.id],
    };

    const updatedStartNode: ICirNode = {
      ...startNode,
      connectionIds: startNode.connectionIds.map((connectionId) =>
        connectionId === endNode.id ? middleNode.id : connectionId
      ),
    };

    const updatedEndNode: ICirNode = {
      ...endNode,
      connectionIds: endNode.connectionIds.map((connectionId) =>
        connectionId === startNode.id ? middleNode.id : connectionId
      ),
    };

    const firstWire: ICirWire = {
      ...splittedWire,
      id: nanoid(),
      endNodeId: middleNode.id,
      x2: middleNode.x,
      y2: middleNode.y,
    };

    const secondWire: ICirWire = {
      ...splittedWire,
      id: nanoid(),
      startNodeId: middleNode.id,
      x1: middleNode.x,
      y1: middleNode.y,
    };

    dispatch(removeWireById(splittedWire.id));
    dispatch(addNode(middleNode));
    dispatch(updateNodeById({ id: updatedStartNode.id, updatedNode: updatedStartNode }));
    dispatch(updateNodeById({ id: updatedEndNode.id, updatedNode: updatedEndNode }));
    dispatch(addWire(firstWire));
    dispatch(addWire(secondWire));
  };
