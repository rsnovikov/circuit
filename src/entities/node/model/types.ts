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
