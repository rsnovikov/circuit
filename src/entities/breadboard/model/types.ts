import { ICirElement } from '@/shared/model/types';

export interface IBreadboardCirElement extends ICirElement {
  id: string;
  x: number;
  y: number;
  rotate: number;
}
