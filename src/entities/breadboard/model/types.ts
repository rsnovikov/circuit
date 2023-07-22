import { ICirElement } from '@/shared/model/types';

export interface IBreadboardCirElement extends ICirElement {
  id: string;
  x: number;
  y: number;
  rotate: number;
}

export interface IDraggableElement {
  elementId: string;
  offsetX: number;
  offsetY: number;
  initialX: number;
  initialY: number;
}

export interface INodeRelatedElement {
  elementId: string;
  terminalId: string;
}

export interface ICirNode {
  id: string;
  x: number;
  y: number;
  rotate: number;
  relatedElement: INodeRelatedElement | null;
  connectionIds: string[];
}

export interface ICirWire {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  startNodeId: string;
  endNodeId: string | null;
  // startElementId?: string | null;
  // endElementId: string | null;
  color: string;
}
