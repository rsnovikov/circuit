import { ElementTypesEnum } from './ElementTypesEnum';

export interface IComponent {
  d: string;
}

export interface ITerminal {
  id: string;
  x: number;
  y: number;
  relatedTerminalId: string | null;
  name: string;
}

export interface IHitbox {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export interface ICirElement {
  type: ElementTypesEnum;
  components: IComponent[];
  name: string;
  terminals: ITerminal[];
  hitbox?: IHitbox;
  previewImgPath: string;
}

export interface ICoords {
  x: number;
  y: number;
}

export interface ITranslateCoords {
  translateX: number;
  translateY: number;
}

export interface IDraggableElement {
  elementId: string;
  offsetX: number;
  offsetY: number;
  initialX: number;
  initialY: number;
}
