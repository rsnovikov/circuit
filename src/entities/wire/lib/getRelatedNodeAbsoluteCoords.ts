import { initialCirElementList } from '@/entities/cirElement/model/InitialCirElementList';
import { ICirElement } from '@/entities/cirElement/model/types';
import { ICirNode } from '@/entities/node';
import { ICoords } from '@/shared/model/types';

export const getRelatedNodeAbsoluteCoords = (
  node: ICirNode,
  elements: ICirElement[]
): ICoords | undefined => {
  if (!node.relatedElement) return { x: node.x, y: node.y };

  const element = elements.find((element) => element.id === node.relatedElement?.elementId);
  if (!element) return;

  const terminal = initialCirElementList[element.type].terminals.find(
    (terminal) => terminal.id === node.relatedElement?.terminalId
  );
  if (!terminal) return;

  return { x: element.x + terminal.x, y: element.y + terminal.y };
};
