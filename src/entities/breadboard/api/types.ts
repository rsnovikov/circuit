import { ICirNode } from '@/entities/node';
import { ICirWire } from '@/entities/wire';
import { IBreadboardCirElement } from '../model/types';

export type CircuitListItem = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateBreadboardReq = {
  name: string;
};

export type CreateBreadboardRes = CircuitListItem;

export type CircuitData = {
  _id: string;
  name: string;
  elements: IBreadboardCirElement[];
  nodes: ICirNode[];
  wires: ICirWire[];
  updatedAt: string;
};

export type PartialCircuitData = Partial<CircuitData> & { _id: string };
