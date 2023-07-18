import { ElementsEnum } from '../model/ElementsEnum';

export interface IComponent {
  d: string;
}

export interface ITerminal {
  id: string;
  x: number;
  y: number;
  type: string;
  name: string;
}

export interface IHitbox {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export interface ICirElement {
  type: ElementsEnum;
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
