import { CircuitData } from '@/entities/circuit/api/types';
import { ICirWire } from '..';
import { getRelatedNodeAbsoluteCoords } from './getRelatedNodeAbsoluteCoords';

export const getWiresFromCircuitData = ({ wires: wiresData, elements, nodes }: CircuitData) => {
  const wires: ICirWire[] = wiresData.reduce((acc, wireData) => {
    const startNode = nodes.find((node) => node.id === wireData.startNodeId);
    const endNode = nodes.find((node) => node.id === wireData.endNodeId);
    if (!startNode || !endNode) return acc;

      
    const startCoords = getRelatedNodeAbsoluteCoords(startNode, elements);
    const endCoords = getRelatedNodeAbsoluteCoords(endNode, elements);
    if (!startCoords || !endCoords) return acc;

    const { x: x1, y: y1 } = startCoords;

    const { x: x2, y: y2 } = endCoords;

    return [...acc, { ...wireData, x1, y1, x2, y2 }];
  }, [] as ICirWire[]);
  return wires;
};
