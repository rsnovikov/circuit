import { ElementTypesEnum } from '@/entities/breadboard/model/ElementTypesEnum';

export interface IPickerElement {
  type: ElementTypesEnum;
  name: string;
  previewImgPath: string;
}
