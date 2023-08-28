import { AppDispatch, RootState } from '@/app/appStore';
import { ICirElement } from '@/entities/cirElement/model/types';
import { getWirePosByElement } from '../../lib/getWirePosByElement';
import { updateWireById } from '../slice';
import { ICirWire } from '../types';

// TODO: remove
export const updateWiresCoordsByCirElementAction =
  (cirElement: ICirElement) => (dispatch: AppDispatch, getState: () => RootState) => {
    const {
      node: { nodes },
      wire: { wires },
    } = getState();
    // TODO: optimize iterables, maybe add field relatedElement to wire
    const elementNodes = nodes.filter((node) => node.relatedElement?.elementId === cirElement.id);
    // TODO: refactor this trash!
    wires
      .filter((wire) =>
        elementNodes.some((node) => node.id === wire.startNodeId || node.id === wire.endNodeId)
      )
      .forEach((wire) => {
        const endNode = elementNodes.find((node) => node.id === wire.endNodeId);
        if (endNode) {
          const { x, y } = getWirePosByElement({ element: cirElement, node: endNode });

          const updatedWire: ICirWire = {
            ...wire,
            x2: x,
            y2: y,
          };
          dispatch(updateWireById({ id: updatedWire.id, updatedWire }));
        } else {
          const startNode = elementNodes.find((node) => node.id === wire.startNodeId);
          if (!startNode) return;
          const { x, y } = getWirePosByElement({ element: cirElement, node: startNode });

          const updatedWire: ICirWire = {
            ...wire,
            x1: x,
            y1: y,
          };
          dispatch(updateWireById({ id: updatedWire.id, updatedWire }));
        }
      });
  };
