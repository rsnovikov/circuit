import { IBreadboardCirElement } from '@/entities/breadboard/model/types';
import { ICirNode } from '@/entities/node';
import { cirElementList } from '@/shared/api/__mock__/cirElementList';
import { ICoords } from '@/shared/model/types';

export const getRelatedNodeAbsoluteCoords = (
  node: ICirNode,
  elements: IBreadboardCirElement[]
): ICoords | undefined => {
  if (!node.relatedElement) return { x: node.x, y: node.y };

  const element = elements.find((element) => element.id === node.relatedElement?.elementId);
  if (!element) return;

  const terminal = cirElementList[element.type].terminals.find(
    (terminal) => terminal.id === node.relatedElement?.terminalId
  );
  if (!terminal) return;

  return { x: element.x + terminal.x, y: element.y + terminal.y };
};
