import { ICirElement, IPhysDataItem } from '@/shared/model/types';

export interface IBreadboardElementPhysData {
  [key: string]: Pick<IPhysDataItem, 'value'>;
}

export interface IBreadboardCirElement extends Pick<ICirElement, 'type'> {
  id: string;
  x: number;
  y: number;
  rotate: number;
  personalName: string;
  physData: IBreadboardElementPhysData;
}
