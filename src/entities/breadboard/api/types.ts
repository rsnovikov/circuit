import { ICirNode } from '@/entities/node';
import { ICirWireData } from '@/shared/model/types';
import { IBreadboardCirElement } from '../model/types';

export type IBreadboardResponse = {
  nodes: ICirNode[];
  elements: IBreadboardCirElement[];
  wires: ICirWireData[];
};
