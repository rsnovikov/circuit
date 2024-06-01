import { FC } from "react";
import { ElementTypesEnum } from '../../entities/cirElement/model/ElementTypesEnum';
import { ICirElement } from "@/entities/cirElement/model/types";

export interface IComponent {
  d: string;
}

export interface ITerminal {
  id: string;
  x: number;
  y: number;
  relatedTerminalId: string | null;
  name: string;
  noInitialNode?:boolean
}

export interface IHitbox {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export interface IPhysDataItem {
  isChangeable?: boolean;
  title: string;
  value: number;
}

export interface IPhysData {
  [key: string]: IPhysDataItem;
}

export interface ICirElementLayout extends Pick<ICirElement, 'power'>{
  isSelected: boolean
}
export interface IInitialCirElement {
  type: ElementTypesEnum;
  components?: IComponent[];
  Layout?: FC<ICirElementLayout>;
  name: string;
  terminals: ITerminal[];
  hitbox?: IHitbox;
  previewImgPath: string;
  physData: IPhysData;
}

export type IInitialCirElementList = {
  [key in ElementTypesEnum]: IInitialCirElement;
};

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

export interface ICirWireData {
  id: string;
  startNodeId: string;
  endNodeId: string | null;
  color: string;
}

export type FormField = {
  name: string;
  title?: string;
  placeholder?: string;
  type?: string;
  defaultValue?: string;
};
