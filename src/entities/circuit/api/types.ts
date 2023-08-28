import { ICirElement } from '@/entities/cirElement/model/types';
import { ICirNode } from '@/entities/node';
import { ICirWireData } from '@/shared/model/types';

export type CircuitListItem = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateCircuitReq = {
  name: string;
};

export type CreateCircuitRes = CircuitListItem;

export type CircuitData = {
  _id: string;
  name: string;
  elements: ICirElement[];
  nodes: ICirNode[];
  wires: ICirWireData[];
  updatedAt: string;
};

export type PartialCircuitData = Partial<CircuitData> & { _id: string };
