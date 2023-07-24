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
