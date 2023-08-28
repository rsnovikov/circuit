import { IInitialCirElement, IPhysDataItem } from '@/shared/model/types';

export interface ICirElementPhysData {
  [key: string]: Pick<IPhysDataItem, 'value'>;
}

export interface ICirElement extends Pick<IInitialCirElement, 'type'> {
  id: string;
  x: number;
  y: number;
  rotate: number;
  personalName: string;
  physData: ICirElementPhysData;
}
