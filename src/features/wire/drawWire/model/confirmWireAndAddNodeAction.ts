import { nanoid } from 'nanoid';
import { AppDispatch, RootState } from '@/app/appStore';
import { ICirNode, addNode, updateNodeById } from '@/entities/node';
import { ICirWire, addWire } from '@/entities/wire';
import { startWireAction } from '@/entities/wire/model/actions/startWireAction';
import { roundTo } from '@/shared/lib/roundTo';
import { transformCoords } from '@/shared/lib/transformCoords';
import { ICoords } from '@/shared/model/types';

export const confirmWireAndAddNodeAction =
  ({ x, y }: ICoords) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      circuit: { scale, translateCoords, gridStep },
      node: { nodes },
      wire: { drawingWire },
    } = getState();
    if (!drawingWire) return;

    const startNode = nodes.find((node) => node.id === drawingWire.startNodeId);
    if (!startNode) return;

    const { x: transformedX, y: transformedY } = transformCoords({ x, y, scale, translateCoords });

    const roundedX = roundTo(transformedX, gridStep);
    const roundedY = roundTo(transformedY, gridStep);

    const endNode: ICirNode = {
      id: nanoid(),
      x: roundedX,
      y: roundedY,
      connectionIds: [drawingWire.startNodeId],
      relatedElement: null,
    };

    const updatedWire: ICirWire = {
      ...drawingWire,
      endNodeId: endNode.id,
      x2: roundedX,
      y2: roundedY,
    };

    const updatedStartNode: ICirNode = {
      ...startNode,
      connectionIds: [...startNode.connectionIds, endNode.id],
    };

    dispatch(addNode(endNode));
    dispatch(addWire(updatedWire));
    dispatch(updateNodeById({ id: updatedStartNode.id, updatedNode: updatedStartNode }));
    dispatch(startWireAction({ x1: roundedX, y1: roundedY, startNodeId: endNode.id }));
  };
